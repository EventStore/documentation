<template>
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
        <SingleColumnRow>
          We have a <a href="https://github.com/EventStore/es-gencert-cli" target="_blank">certificate generation
          tool</a>, which creates certificated adopted for EventStoreDB.
        </SingleColumnRow>
        <SingleColumnRow>
          First, generate a CA certificate, which you'd need to trust for each of the nodes:<br><br>
          <pre><code>es-gencert-cli create-ca</code></pre>
          <br><br>
          By default, the tool will create a <code>ca</code> directory in the current path and add two files there:
          <br><code>ca.crt</code> and <code>ca.key</code>. You will need to copy these files to the server node.
        </SingleColumnRow>

        <h3>Certificates for nodes</h3>
        You need a self-signed certificates for each node as described below.
        <div
            v-for="item in topology.nodes"
            :key="`node-${item.index}`">
          <h4>Node {{ item.index }}</h4>
          <CertCn :common-name="topology.certCommonName"/>
          <CertSan
              :ext-type="nodeExtType(item)" :ext-value="nodeExtValue(item)"
          ></CertSan>
          <CertSan v-if="topology.separateNetworks" ext-type="IP Address" :ext-value="item.intIp"/>
          <CertSan
              v-if="topology.gossipMethod ==='dns'"
              ext-type="DNS Name"
              :ext-value="topology.gossip"
          />
          <CertSan
              v-if="client.advertiseToClient && client.gossipMethod ==='dns'"
              ext-type="DNS Name"
              :ext-value="client.gossip"
          />

          <SingleColumnRow>
            Command for the node certificate generation:<br><br>
            <span v-html="nodeCertGen(item)" />
          </SingleColumnRow>
        </div>
        <SingleColumnRow>
          <h3>Permissions</h3>
          Remember that all certificate files should have restrictive rights, otherwise the OS won't allow using them.
          Usually, you'd need to change rights for each certificate file to prevent the "permissions are too open" error.
          You can do it by running the following command:
          <pre><code>chmod 600 [file]</code></pre>
        </SingleColumnRow>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import SingleColumnRow from "./SingleColumnRow";
import CertCn from "./CertCn";
import CertSan from "./CertSan";

export default {
  name: "Certificates",
  components: {CertCn, CertSan, SingleColumnRow},
  props: {
    topology: Object,
    client: Object
  },
  methods: {
    nodeExtValue(node) {
      return node.dnsName === "" ? node.extIp : node.dnsName;
    },
    nodeExtType(node) {
      return node.dnsName === "" ? "IP Address" : "DNS Name";
    },
    nodeCertGen(node) {
      let dns = [];
      if (node.dnsName !== "") dns.push(node.dnsName);
      if (this.topology.gossipMethod === "dns") dns.push(this.topology.gossip);
      if (this.client.gossipMethod === "dns") dns.push(this.client.gossip);
      const dnsOption = dns.length === 0 ? "" : `\\\n -dns-names ${dns.join(",")} `;

      let ips = [];
      if (node.dnsName === "") ips.push(node.extIp);
      if (this.topology.separateNetworks) ips.push(node.intIp);
      const ipsOption = ips.length === 0 ? "" : `\\\n -ip-addresses ${ips.join(",")} `;

      return `<pre><code class="language-bash">es-gencert-cli create-node -out ./node${node.index} ${ipsOption}${dnsOption}</code></pre>`;
    }
  }
}
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
}

.title {
  font-weight: bold;
}
</style>
