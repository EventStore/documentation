<template>
  <div>
    <h2>Configuration</h2>
    <NodeConfig
      v-for="node in topology.nodes"
      :key="`node-${node.index}`"
      :node="getNodeConfig(node)">
    </NodeConfig>
  </div>
</template>

<script>
import NodeConfig from "./NodeConfig";

export default {
  name: "Configuration",
  components: {NodeConfig},
  props: {
    topology: Object,
    client: Object,
    projections: Object
  },
  methods: {
    getNodeConfig(node) {
      const cert = () => {
        return {
          file: "/certs/node.crt",
          key: "/certs/node.key",
          trusted: "/etc/ssl/certs",
          cn: this.topology.cert === "trusted" ? this.topology.certCommonName : undefined
        }
      };

      const network = () => {
        return {
          intIp: this.topology.separateNetworks ? node.intIp : node.extIp,
          extIp: node.extIp,
          extHost: node.dnsName === "" ? undefined : node.dnsName,
          httpPort: this.topology.httpPort,
          intTcpPort: this.topology.internalTcpPort,
          extTcpPort: this.topology.externalTcpPort,
          enableTcp: this.client.enableTcp,
          enableAtom: this.client.enableAtomPub,
          advertiseToClient: this.client.advertiseToClient,
          advNodeDns: node.clientDnsName,
          advTcpPort: this.client.externalTcpPort,
          advHttpPort: this.client.httpPort
        }
      };

      return {
        index: node.index,
        path: {
          db: "/volume/esdb/data",
          log: "/some/logs",
          index: "/volume/esdb/index",
        },
        certificate: this.topology.secure ? cert() : undefined,
        network: network(),
        projections: this.projections.enable
      }
    }
  }
}
</script>

<style lang="scss">
.el-tabs__item {
  font-size: 16px;
}
</style>
