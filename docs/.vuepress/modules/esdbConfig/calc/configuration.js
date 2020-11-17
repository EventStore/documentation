import topology from "../domain/topology";
import {safe, sep} from "../../common/strings";
import platform from "../domain/platform";
import directories from "../domain/directories";
import security from "../domain/security";
import nodes from "../domain/nodes";
import client from "../domain/client";

export default function(node, projections) {
    const cert = () => {
        const s = sep(platform.platform);
        const certsDir = `${directories.config}${s}certs`;
        return {
            file: `${certsDir}${s}node.crt`,
            key: `${certsDir}${s}node.key`,
            trusted: !security.isSelfSigned
                      ? platform.isLinux ? "/etc/ssl/certs" : undefined
                      : `${certsDir}${s}ca`,
            cn: security.isSelfSigned ? undefined : security.certCommonName
        }
    };

    const intIp = x => topology.separateNetworks ? x.intIp : x.extIp;

    const extAdvertiseAs = x => x.dnsName === "" ? undefined : x.dnsName;

    const intAdvertiseAs = x => topology.separateNetworks ? undefined : extAdvertiseAs(x);

    const gossip = () => {
        if (!topology.isCluster) return undefined;
        if (topology.gossip.isDnsGossip()) {
            return {
                discoverViaDns: true,
                clusterSize: nodes.nodesCount,
                clusterDns: safe(topology.gossip.dnsName)
            }
        } else {
            const otherNodes = nodes.nodes.filter(x => x.index !== node.index);
            return {
                discoverViaDns: false,
                clusterSize: nodes.nodesCount,
                gossipSeeds: otherNodes.map(x => `${safe(x.dnsName === "" ? intIp(x) : x.dnsName)}:${topology.httpPort}`)
            }
        }
    };

    const network = () => {
        return {
            intIp:             intIp(node),
            extIp:             node.extIp,
            extHost:           extAdvertiseAs(node),
            intHost:           intAdvertiseAs(node),
            httpPort:          topology.httpPort,
            intTcpPort:        topology.internalTcpPort,
            extTcpPort:        topology.externalTcpPort,
            enableTcp:         client.isTcpEnabled,
            enableAtom:        client.enableAtomPub,
            advertiseToClient: client.advertiseToClient,
            advNodeAddress:    node.clientAddress,
            advTcpPort:        client.externalTcpPort,
            advHttpPort:       client.httpPort,
        }
    };

    return {
        index: node.index,
        platform: platform.platform,
        path: {
            db: directories.data,
            log: directories.logs,
            index: directories.index,
            config: directories.config
        },
        certificate: security.secure ? cert() : undefined,
        network: network(),
        gossip: gossip(),
        projections: projections
    }
}
