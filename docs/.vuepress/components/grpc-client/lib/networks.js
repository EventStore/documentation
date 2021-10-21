import * as axios from "axios";

export function isValidDns(domain) {
    const re = /^((?:(?:\w[.\-+]?)*\w)+)((?:(?:\w[.\-+]?){0,62}\w)+)\.(\w{2,6})$/;
    return !domain || domain === "localhost" || domain.match(re);
}

export function isValidIpAddress(ipAddress) {
    const ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return !ipAddress || ipAddress.match(ipFormat);
}

export function isValidAddress(address) {
    return isValidIpAddress(address) || isValidDns(address);
}

export async function resolveDns(dnsName) {
    if (dnsName === "" || !isValidDns(dnsName)) return undefined;

    const url = `https://dns.google/resolve?name=${dnsName}`;
    const response = await axios.default.get(url);
    return response.data.Status === 0 ? response.data.Answer.map(x => x.data) : undefined;
}

