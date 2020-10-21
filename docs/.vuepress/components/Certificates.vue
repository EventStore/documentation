<template>
  <ClientOnly>
    <div>
      <h2>Certificates</h2>
      <div>
        <div v-if="topology.cert !== 'self-signed'">
          <SingleColumnRow>
            You need a wildcard certificate signed by a public trusted certificate authority (CA).
          </SingleColumnRow>
          <SingleColumnRow>
            The certificate needs to have the following attributes:
          </SingleColumnRow>
          <CertCn :common-name="topology.certCommonName"/>
          <CertSan ext-type="DNS Name" :ext-value="topology.certCommonName"/>
          <CertSan v-if="client.advertiseToClient && client.gossipMethod ==='dns'" ext-type="DNS Name"
                   :ext-value="client.gossip"/>
        </div>
        <div v-else>
          We have a <a href="https://github.com/EventStore/es-gencert-cli" target="_blank">certificate generation
          tool</a>, which creates certificated adopted for EventStoreDB.<br><br>

          <el-divider content-position="right">Download the tool</el-divider>

          <el-form :model="form" ref="form" label-width="350px" label-position="top">
            <el-form-item label="Choose which OS will you be running the tool:">
              <el-radio-group v-model="form.os">
                <el-radio-button label="linux">Linux</el-radio-button>
                <el-radio-button label="windows">Windows</el-radio-button>
                <el-radio-button label="macos">macOS</el-radio-button>
                <el-radio-button label="docker">Docker (any OS)</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>

          <div v-if="form.os === 'docker'">
            Pull the latest tool image from Docker Hub.
            <pre><code>docker pull eventstore/es-gencert-cli</code></pre>
          </div>
          <div v-else>
            Download and extract the binary from the tool repository
            <a href="https://github.com/EventStore/es-gencert-cli/releases" target="_blank">Releases</a> page.
            <div v-show="form.os === 'macos'">
              <br>
              On macOS you will get a warning that the binary is not trusted. You will have to run the tool from
              Finder once. Right click on the <code>es-gencert-cli</code> binary and choose <code>Open</code>.
              Then, choose <code>Open</code> again in the warning window. The tool will run once in the terminal window.
              From that moment on you will be run the tool using the command line.
            </div>
          </div>

          <br>
          In the directory where you'll be running the tool, create a <code>certs</code> subdirectory.
          <pre><code>mkdir certs</code></pre>

          <el-divider content-position="right">Generate the CA certificate</el-divider>

          Then, generate the CA certificate, which you'd need to trust for each of the nodes:<br><br>
          <pre><code>{{ tool }} create-ca -out .{{sep}}certs{{sep}}ca</code></pre>
          By default, the tool will create the <code>ca</code> directory in the <code>certs</code> directory you created earlier
          and add two files there:
          <br><code>ca.crt</code> and <code>ca.key</code>. You will need to copy the <code>ca.crt</code> files to each node.

          <div v-show="topology.platform === 'linux'">
            <p>On Linux server nodes, you have to add the CA certificate to the trusted certificate store.</p>
            <p>
              First, copy the <code>ca.crt</code> file to <code>/usr/share/ca-certificates</code> directory on the server.
              You need to use <code>sudo</code> for the copy command.
            </p>
            <p>
              Then, update the certificate store:
            </p>
            <pre><code>sudo update-ca-certificates</code></pre>
          </div>

          <el-divider content-position="right">Generate certificates for nodes</el-divider>

          You need to generate self-signed certificates for each node as described below.

          <div
              v-for="item in topology.nodes"
              :key="`node-${item.index}`">
            <h4>Node {{ item.index }}</h4>
            <CertCn :common-name="topology.certCommonName"/>
            <CertSan :ext-type="nodeExtType(item)" :ext-value="nodeExtValue(item)"/>
            <CertSan v-if="topology.separateNetworks" ext-type="IP Address" :ext-value="item.intIp"/>
            <CertSan
                v-if="isDnsClusterGossip"
                ext-type="DNS Name"
                :ext-value="topology.gossip"
            />
            <CertSan
                v-if="client.advertiseToClient && isDnsClientGossip && !(isDnsClusterGossip && topology.gossip === client.gossip)"
                ext-type="DNS Name"
                :ext-value="client.gossip"
            />
            <CertSan
                v-if="client.advertiseToClient"
                ext-type="DNS Name"
                :ext-value="item.clientDnsName"
            />

              Command for the node certificate generation:<br><br>
              <span v-html="nodeCertGen(item)"/>
          </div>

          <el-divider content-position="right">Permissions</el-divider>
            Remember that all certificate files should have restrictive rights, otherwise the OS won't allow using them.
            Usually, you'd need to change rights for each certificate file to prevent the "permissions are too open"
            error.
            You can do it by running the following command:
            <pre><code>chmod 600 [file]</code></pre>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import SingleColumnRow from "./SingleColumnRow";
import CertCn from "./CertCn";
import CertSan from "./CertSan";
import {safeJoin} from "../lib/strings";

export default {
  name: "Certificates",
  components: {CertCn, CertSan, SingleColumnRow},
  props: {
    topology: Object,
    client: Object
  },
  data() {
    return {
      form: {
        os: "linux"
      }
    }
  },
  computed: {
    isDnsClientGossip() {
      return this.client.gossipMethod === "dns";
    },
    isDnsClusterGossip() {
      return this.topology.gossipMethod === "dns";
    },
    sep() {
      return this.form.os === "windows" ? "\\" : "/";
    },
    prefix() {
      switch (this.form.os) {
        case "linux":
        case "macos":
          return "./";
        case "windows":
          return ".\\";
        case "docker":
          return "docker run --rm -i -v $PWD/certs:/certs eventstore/";
      }
    },
    tool() {
      return this.prefix + "es-gencert-cli";
    }
  },
  methods: {
    nodeExtValue(node) {
      return this.isExtIp(node) ? node.extIp : node.dnsName;
    },
    nodeExtType(node) {
      return this.isExtIp(node) ? "IP Address" : "DNS Name";
    },
    isExtIp(node) {
      return node.dnsName === "" || this.isDnsClusterGossip;
    },
    nodeCertGen(node) {
      let dns = [];
      if (!this.isExtIp(node)) dns.push(node.dnsName);
      if (this.isDnsClusterGossip) dns.push(this.topology.gossip);
      if (this.isDnsClientGossip) dns.push(this.client.gossip);
      if (this.client.advertiseToClient) dns.push(node.clientDnsName);
      const dnsOption = dns.length === 0 ? "" : ` -dns-names ${safeJoin(dns)} `;

      let ips = [];
      if (this.isExtIp(node)) ips.push(node.extIp);
      if (this.topology.separateNetworks) ips.push(node.intIp);
      const ipsOption = ips.length === 0 ? "" : ` -ip-addresses ${safeJoin(ips)} `;

      const sep = this.sep;
      const caPath = `.${sep}certs${sep}ca${sep}ca`;

      return `<pre><code class="language-bash">${this.prefix}es-gencert-cli create-node `+
          `-ca-certificate ${caPath}.crt -ca-key ${caPath}.key ` +
          `-out .${sep}certs${sep}node${node.index} ${ipsOption}${dnsOption}</code></pre>`;
    },
    v(val) {
      return val !== undefined && val !== "" ? val : "<not provided>";
    }
  }
}
</script>

<style scoped lang="scss">
h3 {
  padding-bottom: 0;
  padding-top: 1rem;
}

h4 {
  padding-bottom: 0;
  padding-top: 0.3rem;
}
</style>
