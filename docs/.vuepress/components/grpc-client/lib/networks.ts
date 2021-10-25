import * as axios from "axios";

export function isValidDns(domain: string): boolean {
    const re = /^((?:(?:\w[.\-+]?)*\w)+)((?:(?:\w[.\-+]?){0,62}\w)+)\.(\w{2,6})$/;
    return domain === undefined || domain === "localhost" || domain.match(re) !== undefined;
}

export function isValidIpAddress(ipAddress: string): boolean {
    const ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipAddress !== undefined && ipAddress.match(ipFormat) !== undefined;
}

export function isValidAddress(address: string): boolean {
    return isValidIpAddress(address) || isValidDns(address);
}

interface GoogleDnsResponse {
    Status: number;
    Answer: {name: string, data: string}[];
}

export async function resolveDns(dnsName: string): Promise<string[] | undefined> {
    if (dnsName === "" || !isValidDns(dnsName)) return undefined;

    const url = `https://dns.google/resolve?name=${dnsName}`;
    const response = await axios.default.get<GoogleDnsResponse>(url);
    return response.data.Status === 0 ? response.data.Answer.map(x => x.data) : undefined;
}

async function get<T>(url: string, timeout: number): Promise<T | undefined> {
    try {
        const response = await axios.default.get<T>(url,
            {
                timeout: timeout, withCredentials: false, headers: {"Accept": "application/json"}
            }
        );
        return response.data;
    } catch (e) {
        return undefined;
    }
}

export async function getBoth<T>(address: string, port: number, path: string, timeout: number): Promise<T | undefined> {
    const base = `${address}:${port}/${path}`;
    const response = await get<T>(`https://${base}`, timeout);
    return response ? response : await get<T>(`http://${base}`, timeout);
}


