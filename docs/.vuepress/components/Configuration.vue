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
    client: Object
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
          httpPort: this.client.httpPort,
          intTcpPort: this.client.internalTcpPort,
          extTcpPort: this.client.externalTcpPort,
          enableTcp: this.client.enableTcp,
          enableAtom: this.client.enableAtomPub
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
        network: network()

      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
  height: 3.5rem;
}

</style>
