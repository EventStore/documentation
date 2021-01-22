import client from "../domain/client";
import topology from "../domain/topology";
import {safe, safeJoin} from "../../common/strings";
import nodes from "../domain/nodes";
import security from "../domain/security";

export default function (sdk) {
    const httpPort        = client.advertiseToClient ? client.httpPort : topology.httpPort;
    const gossip          = () => client.gossip.isDnsGossip()
        ? `${safe(client.gossip.dnsName)}:${httpPort}`
        : safeJoin(nodes.nodes.map(x => nodeAddress(x, false)));
    const disableValidate = () => {
        switch (sdk) {
            case "tcp":
                return "ValidateServer=false";
            default:
                return "&tlsVerifyCert=false";
        }
    };
    const tcp             = sdk === "tcp";
    const connString      = connectionString(sdk, gossip(), httpPort);

    return {
        httpPort:         httpPort,
        isTcpEnabled:     client.isTcpEnabled,
        gossip:           gossip(tcp),
        connectionString: connString,
        disableValidate:  disableValidate(),
        selfSigned:       security.isSelfSigned,
    }
}

function nodeAddress(node, tcp) {
    return client.advertiseToClient
        ? `${safe(node.clientAddress)}:${tcp ? client.externalTcpPort : client.httpPort}`
        : `${safe(node.dnsName === "" ? node.extIp : node.dnsName)}:${tcp ? topology.externalTcpPort : topology.httpPort}`;
}

function connectionString(sdk, gossip, httpPort) {
    const isClientDnsGossip = client.gossip.isDnsGossip();
    switch (sdk) {
        case "tcp":
            const csBase            = nodes.isSingleNode
                ? `ConnectTo=tcp://${nodeAddress(nodes.nodes[0], true)};`
                : isClientDnsGossip ? `ClusterDns=${client.gossip.dnsName};ExternalGossipPort=${httpPort};` : `GossipSeeds=${gossip};`
            return csBase
                + `UseSslConnection=${client.isSecure};`
                + `DefaultCredentials=admin:changeit`;
        default:
            const scheme = isClientDnsGossip ? "esdb+discover" : "esdb";
            return `${scheme}://admin:changeit@${gossip}?tls=${client.isSecure}`;
    }
}
