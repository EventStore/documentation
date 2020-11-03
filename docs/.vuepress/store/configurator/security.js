import Vue from "vue";
import {createStore} from "../baseStore";
import {CertCnChanged, CertificateTypeChanged, ClusteringChanged, SecurityChanged} from "./events";
import * as networks from "../../lib/networks";

const SelfSignedCommonName = "eventstoredb-node";
const SelfSigned           = "self-signed";

const privateState = Vue.observable({
    cluster: true
});

export default createStore(
    {
        state:         {
            secure:         true,
            cert:           SelfSigned,
            certCommonName: SelfSignedCommonName,
        },
        methods:       {
            updateSecurity(secure) {
                this.state.secure = secure;
                this.emit(SecurityChanged, secure);
            },
            updateCertType(type) {
                if (this.state.cert === type) return;

                this.state.cert = type;
                this.updateCn(this.isSelfSigned() ? SelfSignedCommonName : "");
                this.emit(CertificateTypeChanged, this.isSelfSigned());
            },
            updateCn(value) {
                this.state.certCommonName = value;
                this.emit(CertCnChanged, {selfSigned: this.isSelfSigned(), cn: value});
            },
            isSelfSigned() {
                return this.state.cert === SelfSigned;
            },
            isCluster: () => privateState.cluster,
            cnPrompt() {
                return this.isSelfSigned() ? "" : this.isCluster() ? "*.example.com" : "esdb.example.com";
            },
            certCnHelp() {
                return this.isSelfSigned()
                    ? "Must be <code>eventstoredb-node</code> for self-signed certificate."
                    : `You need a ${this.isCluster() ? "wildcard " : ""}certificate signed by a public trusted CA.`;
            },
            validateCertCn(value) {
                if (!this.state.secure || this.isSelfSigned()) return null;

                const preValid = !this.isCluster() || value.startsWith("*.");
                if (!preValid || !networks.isValidDns(value.substring(2))) {
                    return "Enter a valid wildcard certificate CN";
                }
            }

        },
        eventHandlers: {
            [ClusteringChanged]: (s, x) => privateState.cluster = x
        }
    },
    "security"
);
