import security from "../domain/security";
import client from "../domain/client";
import topology from "../domain/topology";
import * as strings from "../../common/strings";
import nodes from "../domain/nodes";
import caDirs from "./dirs";
import platform from "../domain/platform";

function isExtIp(node) {
    return node.dnsName === "" || topology.gossip.isDnsGossip();
}

function ipCerts(node) {
    let ips = [];
    if (isExtIp(node)) ips.push(node.extIp);
    if (topology.separateNetworks) ips.push(node.intIp);
    if (client.advertiseToClient && node.isClientIp()) ips.push(node.clientAddress);
    return ips;
}

function dnsCerts(node) {
    let dns = [];
    if (!isExtIp(node)) dns.push(node.dnsName);
    if (topology.gossip.isDnsGossip()) dns.push(topology.gossip.dnsName);
    if (client.gossip.isDnsGossip()) dns.push(client.gossip.dnsName);
    if (client.advertiseToClient && !node.isClientIp()) dns.push(node.clientAddress);
    return dns;
}

function nodeCertGen(dns, ips, prefix, sep, index) {
    const dnsOption = dns.length === 0 ? "" : ` -dns-names ${strings.safeJoin(dns)} `;
    const ipsOption = ips.length === 0 ? "" : ` -ip-addresses ${strings.safeJoin(ips)} `;

    const caPath = `.${sep}certs${sep}ca${sep}ca`;

    return `${prefix}es-gencert-cli create-node ` +
        `-ca-certificate ${caPath}.crt -ca-key ${caPath}.key ` +
        `-out .${sep}certs${sep}node${index} ${ipsOption}${dnsOption}`;
}

function prefix(os) {
    switch (os) {
        case "linux":
        case "macos":
            return "./";
        case "windows":
            return ".\\";
        case "docker":
            return "docker run --rm -i -v $PWD/certs:/certs eventstore/";
    }
}

function getTool(os) {
    return prefix(os) + "es-gencert-cli";
}

export default function (os) {
    const result = {
        cn: security.certCommonName
    };

    if (!security.isSelfSigned) {
        result.publicCa = true;
        if (client.advertiseToClient && client.isDnsGossip()) {
            result.extraDns = client.gossip;
        }
        return result;
    }

    const sep  = strings.sep(os);
    const tool = getTool(os);
    const dirs = caDirs();

    result.sep      = sep;
    result.tool     = tool;
    result.caGenCmd = `${result.tool} create-ca -out .${sep}certs${sep}ca`;
    result.certDir  = dirs.certDir;
    result.caDir    = dirs.caDir;
    result.isLinux  = platform.isLinux;

    result.nodes = nodes.nodes.map(node => {
        const ips = ipCerts(node);
        const dns = dnsCerts(node);
        return {
            index:  node.index,
            cn:     security.certCommonName,
            ips:    ips,
            dns:    dns,
            script: nodeCertGen(dns, ips, prefix(os), sep, node.index),
        }
    });

    return result;
}
