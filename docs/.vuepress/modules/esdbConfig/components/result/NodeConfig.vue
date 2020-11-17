<template>
  <ClientOnly>
    <div>
      <h3>Node {{ node.index }}</h3>
      <prism language="yaml">{{ configFile }}</prism>
    </div>
  </ClientOnly>
</template>

<script>
import {safe} from "../../../common/strings";
import configuration from "../../calc/configuration";

export default {
    name:     "NodeConfig",
    props:    {
        node: Object,
        projections: Object
    },
    computed: {
        configFile() {
            const nodeConfig = configuration(this.node, this.projections.enable)
            const config = ["---"];
            config.add   = function (n, v) {
                this.push(`${n}: ${safe(v)}`);
            };
            config.addIf = function (n, v, c) {
                if (c) this.push(`${n}: ${safe(v)}`);
            };

            config.push("# Paths");
            config.push(`Db: ${nodeConfig.path.db}`);
            config.push(`Index: ${nodeConfig.path.index}`);
            config.push(`Log: ${nodeConfig.path.log}`);

            if (nodeConfig.certificate) {
                config.push("\n# Certificates configuration");
                config.add("CertificateFile", nodeConfig.certificate.file);
                config.add("CertificatePrivateKeyFile", nodeConfig.certificate.key);
                config.add("TrustedRootCertificatesPath", nodeConfig.certificate.trusted);
                config.addIf("CertificateReservedNodeCommonName", nodeConfig.certificate.cn, nodeConfig.certificate.cn);
            } else {
                config.push("\n# Run in insecure mode");
                config.add("Insecure", "true");
            }

            config.push("\n# Network configuration");
            config.add("IntIp", nodeConfig.network.intIp);
            config.add("ExtIp", nodeConfig.network.extIp);
            config.addIf("IntHostAdvertiseAs", nodeConfig.network.intHost, nodeConfig.network.intHost);
            config.addIf("ExtHostAdvertiseAs", nodeConfig.network.extHost, nodeConfig.network.extHost);
            config.add("HttpPort", nodeConfig.network.httpPort);
            config.add("IntTcpPort", nodeConfig.network.intTcpPort);
            config.addIf("ExtTcpPort", nodeConfig.network.extTcpPort, nodeConfig.network.enableTcp);
            config.add("EnableExternalTcp", nodeConfig.network.enableTcp);
            config.add("EnableAtomPubOverHTTP", nodeConfig.network.enableAtom);

            if (nodeConfig.network.advertiseToClient) {
                config.push("\n# Advertise to client");
                config.add("AdvertiseHostToClientAs", nodeConfig.network.advNodeAddress);
                config.add("AdvertiseHttpPortToClientAs", nodeConfig.network.advHttpPort)
                config.add("AdvertiseTcpPortToClientAs", nodeConfig.network.advTcpPort)
            }

            if (nodeConfig.gossip) {
                config.push("\n# Cluster gossip");
                config.add("ClusterSize", nodeConfig.gossip.clusterSize);
                config.add("DiscoverViaDns", nodeConfig.gossip.discoverViaDns);
                config.addIf("ClusterDns", nodeConfig.gossip.clusterDns, nodeConfig.gossip.clusterDns);
                config.addIf("GossipSeed", nodeConfig.gossip.gossipSeeds, nodeConfig.gossip.gossipSeeds);
            }

            config.push("\n# Projections configuration");
            config.add("RunProjections", nodeConfig.projections);

            return config.join("\n");
        }
    }
}
</script>
