export const DnsGossip  = "dns";
export const SeedGossip = "seed";

export default {
    state: {
        method:     DnsGossip,
        showGossip: true,
        dnsName:    ""
    },
    changeClustering(cluster) {
        this.showGossip = cluster;
    },
    isDnsGossip() {
        return this.showGossip && this.method === DnsGossip;
    },
    setMethod(method) {
        this.method = method;
    },
    async validateGossip(nodes, value, callback) {
        // if (!this.isDnsGossip()) return ok(callback);
        //
        // if (!ensureCaDomainMatch(this.dnsName, this.certCn)) {
        //     return error(callback, "Certificate CN mismatch");
        // }
        //
        // return await validateGossip(nodes, value, callback);
    },
    isValid(gossipPort) {
        return !this.isDnsGossip() || (this.dnsName !== "" && gossipPort > 0);
    }
}
