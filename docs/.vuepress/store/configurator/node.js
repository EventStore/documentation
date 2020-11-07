import * as networks from "../../lib/networks";

export default class Node {
    constructor(index) {
        this.index         = index;
        this.intIp         = "";
        this.extIp         = "";
        this.dnsName       = "";
        this.clientAddress = "";
    }

    async resolveDnsName() {
        if (this.dnsName === "") return;

        const ips  = await networks.resolveDns(this.dnsName);
        this.extIp = ips === undefined ? "" : ips[0];
    }

    isClientIp() {
        return networks.isValidIpAddress(this.clientAddress);
    }
}
