import {getBoth} from "./networks";

interface ServerInfo {
    esVersion: string;
    state: string;
    authentication: {
        type: string;
    }
}

interface ClusterMember {
    httpEndPointIp: string;
    httpEndPointPort: number;
    isReadOnlyReplica: boolean;
}

interface GossipInfo {
    members: ClusterMember[];
    serverIp: string;
    serverPort: number;
}

interface ClusterInfo{
    info?: ServerInfo;
    gossip?: GossipInfo;
}

export async function getClusterConfig(address: string, port: number): Promise<ClusterInfo> {
    const info   = await getBoth<ServerInfo | undefined>(address, port, "info", 500);
    const gossip = await getBoth<GossipInfo | undefined>(address, port, "gossip", 500);
    return {info, gossip};
}
