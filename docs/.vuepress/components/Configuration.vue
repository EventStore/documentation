<template>
  <ClientOnly>
    <div>
      <h2>EventStoreDB installation and configuration</h2>

      <el-divider content-position="right">Installation</el-divider>

      <Installation :directories="directories" :topology="topology"/>

      <el-divider content-position="right">Configuration</el-divider>

      <NodeConfig
          v-for="node in topology.nodes"
          :key="`node-${node.index}`"
          :node="getNodeConfig(node)"/>
    </div>
  </ClientOnly>
</template>

<script>
import NodeConfig from "./NodeConfig";
import Installation from "./Installation";
import {safe, sep} from "../lib/strings";

export default {
  name: "Configuration",
  components: {NodeConfig, Installation},
  props: {
    directories: Object,
    topology: Object,
    client: Object,
    projections: Object
  },
  methods: {
    getNodeConfig(node) {
      const cert = () => {
        const s = sep(this.topology.platform);
        const certsDir = `${this.directories.config}${s}certs`;
        return {
          file: `${certsDir}${s}node.crt`,
          key: `${certsDir}${s}node.key`,
          trusted: this.topology.cert === "trusted"
              ? this.topology.platform === "linux" ? "/etc/ssl/certs" : undefined
              : `${certsDir}${s}ca`,
          cn: this.topology.cert === "trusted" ? this.topology.certCommonName : undefined
        }
      };

      const intIp = x => this.topology.separateNetworks ? x.intIp : x.extIp;

      const extAdvertiseAs = x => x.dnsName === "" ? undefined : x.dnsName;

      const intAdvertiseAs = x => this.topology.separateNetworks ? undefined : extAdvertiseAs(x);

      const gossip = () => {
        if (!this.topology.cluster) return undefined;
        if (this.topology.gossipMethod === "dns") {
          return {
            discoverViaDns: true,
            clusterSize: this.topology.nodesCount,
            clusterDns: safe(this.topology.gossip)
          }
        } else {
          const otherNodes = this.topology.nodes.filter(x => x.index !== node.index);
          return {
            discoverViaDns: false,
            clusterSize: this.topology.nodesCount,
            gossipSeeds: otherNodes.map(x => `${safe(x.dnsName === "" ? intIp(x) : x.dnsName)}:${this.topology.httpPort}`)
          }
        }
      };

      const network = () => {
        return {
          intIp: intIp(node),
          extIp: node.extIp,
          extHost: extAdvertiseAs(node),
          intHost: intAdvertiseAs(node),
          httpPort: this.topology.httpPort,
          intTcpPort: this.topology.internalTcpPort,
          extTcpPort: this.topology.externalTcpPort,
          enableTcp: this.client.enableTcp,
          enableAtom: this.client.enableAtomPub,
          advertiseToClient: this.client.advertiseToClient,
          advNodeDns: node.clientDnsName,
          advTcpPort: this.client.externalTcpPort,
          advHttpPort: this.client.httpPort,
        }
      };

      return {
        index: node.index,
        platform: this.topology.platform,
        path: {
          db: this.directories.data,
          log: this.directories.logs,
          index: this.directories.index,
          config: this.directories.config
        },
        certificate: this.topology.secure ? cert() : undefined,
        network: network(),
        gossip: gossip(),
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
