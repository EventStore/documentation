import topology from "../store/configurator/topology";
import {safe, sep} from "../theme/util/strings";
import platform from "../store/configurator/platform";
import directories from "../store/configurator/directories";
import security from "../store/configurator/security";
import nodes from "../store/configurator/nodes";
import client from "../store/configurator/client";

export default function(node, projections) {
    const cert = () => {
        const s = sep(platform.state.platform);
        const certsDir = `${directories.state.config}${s}certs`;
        return {
            file: `${certsDir}${s}node.crt`,
            key: `${certsDir}${s}node.key`,
            trusted: !security.isSelfSigned()
                      ? platform.isLinux() ? "/etc/ssl/certs" : undefined
                      : `${certsDir}${s}ca`,
            cn: security.isSelfSigned() ? undefined : security.state.certCommonName
        }
    };

    const intIp = x => topology.state.separateNetworks ? x.intIp : x.extIp;

    const extAdvertiseAs = x => x.dnsName === "" ? undefined : x.dnsName;

    const intAdvertiseAs = x => topology.state.separateNetworks ? undefined : extAdvertiseAs(x);

    const gossip = () => {
        if (!topology.isCluster()) return undefined;
        if (topology.state.gossip.isDnsGossip()) {
            return {
                discoverViaDns: true,
                clusterSize: nodes.state.nodesCount,
                clusterDns: safe(topology.state.gossip.dnsName)
            }
        } else {
            const otherNodes = nodes.state.nodes.filter(x => x.index !== node.index);
            return {
                discoverViaDns: false,
                clusterSize: nodes.state.nodesCount,
                gossipSeeds: otherNodes.map(x => `${safe(x.dnsName === "" ? intIp(x) : x.dnsName)}:${topology.state.httpPort}`)
            }
        }
    };

    const network = () => {
        return {
            intIp: intIp(node),
            extIp: node.extIp,
            extHost: extAdvertiseAs(node),
            intHost: intAdvertiseAs(node),
            httpPort: topology.state.httpPort,
            intTcpPort: topology.state.internalTcpPort,
            extTcpPort: topology.state.externalTcpPort,
            enableTcp: client.state.enableTcp,
            enableAtom: client.state.enableAtomPub,
            advertiseToClient: client.state.advertiseToClient,
            advNodeDns: node.clientDnsName,
            advTcpPort: client.state.externalTcpPort,
            advHttpPort: client.state.httpPort,
        }
    };

    return {
        index: node.index,
        platform: platform.state.platform,
        path: {
            db: directories.state.data,
            log: directories.state.logs,
            index: directories.state.index,
            config: directories.state.config
        },
        certificate: security.state.secure ? cert() : undefined,
        network: network(),
        gossip: gossip(),
        projections: projections
    }
}
