import {resolveDns} from "./networks";
import {getClusterConfig} from "./clusterInfo";
import {getEmptyConnection} from "./connection";
import {GossipMethod} from "./enums";
import {reactive} from "vue";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {KeepAlive} from "./keepAlive";
import {ClusterNode} from "./clientNode";

export interface ConnectionString {
    result?: string;
    query?: string[];
    success: boolean;
    err?: string;
}

export const connectionString: UnwrapNestedRefs<ConnectionString> = reactive<ConnectionString>({success: false});

export const copyFrom = (from: UnwrapNestedRefs<ConnectionString>, to: UnwrapNestedRefs<ConnectionString>) => {
    to.err = from.err;
    to.result = from.result;
    to.success = from.success;
}

export async function fromCloudClusterId(clusterId: string): Promise<ConnectionString> {
    const dnsName = `${clusterId}.mesdb.eventstore.cloud`;
    const resolvedDns = await resolveDns(dnsName);
    if (resolvedDns === undefined || resolvedDns.length === 0) {
        return {success: false, err: `Cannot resolve cluster DNS name`};
    }

    const isCluster = resolvedDns.length > 1;
    const scheme = `esdb${isCluster ? "+discover" : ""}://`;
    const result = `${scheme}${dnsName}:2113`;
    return {result, success: true};
}

export async function fromNodeUrl(node: ClusterNode, keepAlive: KeepAlive): Promise<ConnectionString> {
    const es = await getClusterConfig(node.state.address, node.state.port);
    if (!es.gossip && !es.info) {
        return {success: false, err: "Unable to reach the specified node"};
    }
    const hasGossip = es.gossip !== undefined;
    const clusterMembersCount = !hasGossip ? 1 : es.gossip.members.length;
    const cluster = clusterMembersCount > 1;
    const connection = getEmptyConnection(cluster);
    connection.changeSecurity(es.info.authentication.type !== "insecure");
    connection.setNodesCount(clusterMembersCount);
    if (hasGossip) {
        for (let i = 0; i < clusterMembersCount; i++) {
            connection.setNodeAddress(i, es.gossip.members[i].httpEndPointIp, es.gossip.members[i].httpEndPointPort);
        }
    } else {
        connection.setNodeAddress(0, node.state.address, node.state.port);
    }
    connection.setGossipMethod(GossipMethod.Seed);
    const calculated = connection.calculateConnectionString();
    const result = joinUrl(calculated.result, [...calculated.query, ...keepAlive.getKeepAliveQuery()])
    return {
        result,
        success: result !== undefined,
        err: result === undefined ? "Something went wrong" : undefined
    };
}

export function joinUrl(connString: string | undefined, query: string[]): string | undefined {
    return connString === undefined || query.length === 0 ? connString : `${connString}?${query.join("&")}`;
}

export function addKeepAlive(connString: ConnectionString, keepAlive: KeepAlive): string {
    return joinUrl(connString.result, keepAlive.getKeepAliveQuery());
}
