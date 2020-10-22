<template>
  <ClientOnly>
  <div>
    <h3>Node {{ node.index }}</h3>
    <prism language="yaml">{{ configFile }}</prism>
  </div>
  </ClientOnly>
</template>

<script>
import {safe} from "../lib/strings";

export default {
  name: "NodeConfig",
  props: {
    node: Object
  },
  computed: {
    configFile() {
      const config = ["---"];
      config.add = function(n, v) {
        this.push(`${n}: ${safe(v)}`);
      };
      config.addIf = function(n, v, c) {
        if (c) this.push(`${n}: ${safe(v)}`);
      };

      config.push("# Paths");
      config.push(`Db: ${this.node.path.db}`);
      config.push(`Index: ${this.node.path.index}`);
      config.push(`Log: ${this.node.path.log}`);

      if (this.node.certificate) {
        config.push("\n# Certificates configuration");
        config.add("CertificateFile", this.node.certificate.file);
        config.add("CertificatePrivateKeyFile", this.node.certificate.key);
        config.add("TrustedRootCertificatesPath", this.node.certificate.trusted);
        config.addIf("CertificateReservedNodeCommonName", this.node.certificate.cn, this.node.certificate.cn);
      }

      config.push("\n# Network configuration");
      config.add("IntIp", this.node.network.intIp);
      config.add("ExtIp", this.node.network.extIp);
      config.addIf("IntHostAdvertiseAs", this.node.network.intHost, this.node.network.intHost);
      config.addIf("ExtHostAdvertiseAs", this.node.network.extHost, this.node.network.extHost);
      config.add("HttpPort", this.node.network.httpPort);
      config.add("IntTcpPort", this.node.network.intTcpPort);
      config.addIf("ExtTcpPort", this.node.network.extTcpPort, this.node.network.enableTcp);
      config.add("EnableExternalTcp", this.node.network.enableTcp);
      config.add("EnableAtomPubOverHTTP", this.node.network.enableAtom);

      if (this.node.network.advertiseToClient) {
        config.push("\n# Advertise to client");
        config.add("AdvertiseHostToClientAs", this.node.network.advNodeDns);
        config.add("AdvertiseHttpPortToClientAs", this.node.network.advHttpPort)
        config.add("AdvertiseTcpPortToClientAs", this.node.network.advTcpPort)
      }

      if (this.node.gossip) {
        config.push("\n# Cluster gossip");
        config.add("ClusterSize", this.node.gossip.clusterSize);
        config.add("DiscoverViaDns", this.node.gossip.discoverViaDns);
        config.addIf("ClusterDns", this.node.gossip.clusterDns, this.node.gossip.clusterDns);
        config.addIf("GossipSeed", this.node.gossip.gossipSeeds, this.node.gossip.gossipSeeds);
      }

      config.push("\n# Projections configuration");
      config.add("RunProjections", this.node.projections);

      return config.join("\n");
    }
  }
}
</script>

<style scoped>

</style>
