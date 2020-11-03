import {DnsGossip} from "./gossipTypes";
import {EventBus} from "../eventBus";
import {CertCnChanged, CertificateTypeChanged, ClusteringChanged} from "../configurator/events";
import {ensureCaDomainMatch, ok, error, validateGossip} from "../../lib/validate";

export default class Gossip {
    constructor(type, message, subscribe) {
        this.type                = type;
        this.message             = message;
        this.method              = DnsGossip;
        this.disableGossipMethod = false;
        this.showGossip          = true;
        this.dnsName             = "";

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
        return this.method === DnsGossip;
    }

    handleSelfSigned(selfSigned) {
        this.disableGossip(!selfSigned);
        if (!selfSigned) {
            this.method = DnsGossip;
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
}
