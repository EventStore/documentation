import {resolveDns} from "./networks";

export interface ConnectionString {
    result?: string;
    success: boolean;
    err?: string;
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
