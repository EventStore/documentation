import {resolveDns} from "./networks";
import * as networks from "./networks";

export function ok(callback) {
    callback();
    return true;
}

export function error(callback, message) {
    callback(new Error(message));
    return false;
}

export function validateDnsName(rule, value, callback) {
    return networks.isValidDns(value) ? null : error(callback, "Invalid DNS name");
}

export function validateIpAddress(rule, value, callback) {
    return value !== "" && networks.isValidIpAddress(value)
        ? true
        : error(callback, "Invalid IP address");
}

export async function validateGossip(nodes, value, callback) {
    const ips = await resolveDns(value);
    if (ips === undefined) {
        return error(callback, "Unable to resolve DNS name");
    }
    const notFound = nodes.filter(x => x.extIp !== "" && !ips.find(y => y === x.extIp));
    return notFound.length === 0
        ? ok(callback)
        : error(callback, `${value} does not resolve to ${notFound[0].extIp}`);
}
