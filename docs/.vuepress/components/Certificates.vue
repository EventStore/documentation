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
        tool</a>, which creates certificated adopted for EventStoreDB.

        First, generate a CA certificate, which you'd need to trust for each of the nodes:<br><br>
        <pre><code>es-gencert-cli create-ca</code></pre>
        By default, the tool will create a <code>ca</code> directory in the current path and add two files there:
        <br><code>ca.crt</code> and <code>ca.key</code>. You will need to copy these files to the server node.

        <h3>Certificates for nodes</h3>
        You need a self-signed certificates for each node as described below.

        <div
            v-for="item in topology.nodes"
            :key="`node-${item.index}`">
          <h4>Node {{ item.index }}</h4>
          <CertCn :common-name="topology.certCommonName"/>
          <CertSan :ext-type="nodeExtType(item)" :ext-value="nodeExtValue(item)" />
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

          <SingleColumnRow>
            Command for the node certificate generation:<br><br>
            <span v-html="nodeCertGen(item)"/>
          </SingleColumnRow>
        </div>
        <SingleColumnRow>
          <h3>Permissions</h3>
          Remember that all certificate files should have restrictive rights, otherwise the OS won't allow using them.
          Usually, you'd need to change rights for each certificate file to prevent the "permissions are too open"
          error.
          You can do it by running the following command:
          <pre><code>chmod 600 [file]</code></pre>
        </SingleColumnRow>
      </div>
    </div>
    <div>

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
  computed: {
    isDnsClientGossip() {
      return this.client.gossipMethod === "dns";
    },
    isDnsClusterGossip() {
      return this.topology.gossipMethod === "dns";
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
      const dnsOption = dns.length === 0 ? "" : `\\\n -dns-names ${safeJoin(dns)} `;

      let ips = [];
      if (this.isExtIp(node)) ips.push(node.extIp);
      if (this.topology.separateNetworks) ips.push(node.intIp);
      const ipsOption = ips.length === 0 ? "" : `\\\n -ip-addresses ${safeJoin(ips)} `;

      return `<pre><code class="language-bash">es-gencert-cli create-node -out ./node${node.index} ${ipsOption}${dnsOption}</code></pre>`;
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
