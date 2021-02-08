import {DnsGossip, SeedGossip} from "./gossipTypes";
import {EventBus} from "./eventBus";
import {CertCnChanged, CertificateTypeChanged, ClusteringChanged} from "../esdbConfig/domain/events";
import {ensureCaDomainMatch, ok, error, validateGossip} from "../../lib/validate";

export default class Gossip {
    constructor(type, message, subscribe, dnsAlwaysOn) {
        this.type                = type;
        this.message             = message;
        this.method              = DnsGossip;
        this.disableGossipMethod = false;
        this.showGossip          = true;
        this.dnsName             = "";
        this.dnsAlwaysOn         = dnsAlwaysOn;

        if (subscribe) {
            EventBus.$on(ClusteringChanged, x => this.changeClustering(x));
            EventBus.$on(CertificateTypeChanged, x => this.handleSelfSigned(x));
            EventBus.$on(CertCnChanged, x => this.certCn = x);
        }
    }

    changeClustering(cluster) {
        this.showGossip = cluster;
    }

    isDnsGossip() {
        return this.showGossip && this.method === DnsGossip;
    }

    handleSelfSigned(selfSigned) {
        if (this.dnsAlwaysOn) return;

        this.disableGossip(!selfSigned);
        if (!selfSigned) {
            this.method = SeedGossip;
        }
    }

    setMethod(method) {
        this.method = method;
    }

    disableGossip(disable) {
        this.disableGossipMethod = disable;
    }

    async validateGossip(nodes, value, callback) {
        if (!this.isDnsGossip()) return ok(callback);

        if (ensureCaDomainMatch(this.dnsName, this.certCn)) {
            return error(callback, "Certificate CN mismatch");
        }

        return await validateGossip(nodes, value, callback);
    }

    gossipTypeHelp() {
        return this.showGossip && this.disableGossipMethod
            ? "When nodes use wildcard certificate, cluster gossip can only use the nodes seed."
            : "";
    }

    isValid(gossipPort) {
        return !this.isDnsGossip() || (this.dnsName !== "" && gossipPort > 0);
    }
}
