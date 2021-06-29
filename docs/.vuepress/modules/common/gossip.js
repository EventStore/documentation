import {DnsGossip, SeedGossip} from "./gossipTypes";
import {EventBus} from "./eventBus";
import {CertCnChanged, CertificateTypeChanged, ClusteringChanged} from "../esdbConfig/domain/events";
import {ensureCaDomainMatch, ok, error, validateGossip} from "../../lib/validate";

export default class Gossip {
    constructor(type, message, subscribe) {
        this.type                = type;
        this.message             = message;
        this.method              = DnsGossip;
        this.showGossip          = true;
        this.dnsName             = "";

        if (subscribe) {
            EventBus.$on(ClusteringChanged, x => this.changeClustering(x));
            EventBus.$on(CertCnChanged, x => this.certCn = x);
        }
    }

    changeClustering(cluster) {
        this.showGossip = cluster;
    }

    isDnsGossip() {
        return this.showGossip && this.method === DnsGossip;
    }

    setMethod(method) {
        this.method = method;
    }

    async validateGossip(nodes, value, callback) {
        if (!this.isDnsGossip()) return ok(callback);

        if (!ensureCaDomainMatch(this.dnsName, this.certCn)) {
            return error(callback, "Certificate CN mismatch");
        }

        return await validateGossip(nodes, value, callback);
    }

    isValid(gossipPort) {
        return !this.isDnsGossip() || (this.dnsName !== "" && gossipPort > 0);
    }
}
