import Vue from "vue";
import {CertCnChanged, CertificateTypeChanged, ClusteringChanged, SecurityChanged} from "./events";
import * as networks from "../../../lib/networks";
import {EventBus} from "../../common/eventBus";
import properties from "../../common/properties";

const SelfSignedCommonName = "eventstoredb-node";
const SelfSigned           = "self-signed";

const privateState = Vue.observable({
    cluster: true
});

export default new Vue({
    data() {
        return {
            secure:         true,
            cert:           SelfSigned,
            certCommonName: SelfSignedCommonName,
        }
    },
    methods:       {
        updateSecurity(secure) {
            this.secure = secure;
            EventBus.$emit(SecurityChanged, secure);
        },
        updateCertType(type) {
            if (this.cert === type) return;

            this.cert = type;
            this.updateCn(this.isSelfSigned ? SelfSignedCommonName : "");
            EventBus.$emit(CertificateTypeChanged, this.isSelfSigned);
        },
        updateCn(value) {
            this.certCommonName = value;
            EventBus.$emit(CertCnChanged, {selfSigned: this.isSelfSigned, cn: value});
        },
        validateCertCn(value) {
            if (!this.secure || this.isSelfSigned) return null;

            const preValid = !this.isCluster || value.startsWith("*.");
            if (!preValid || !networks.isValidDns(value.substring(2))) {
                return "Enter a valid wildcard certificate CN";
            }
        },
        ...properties
    },

    computed: {
        isSelfSigned() {
            return this.cert === SelfSigned;
        },
        isCluster: () => privateState.cluster,
        cnPrompt() {
            return this.isSelfSigned ? "" : this.isCluster ? "*.example.com" : "esdb.example.com";
        },
        certCnHelp() {
            return this.isSelfSigned
                ? "Must be <code>eventstoredb-node</code> for self-signed certificate."
                : `You need a ${this.isCluster ? "wildcard " : ""}certificate signed by a public trusted CA.`;
        }
    },

    created() {
        EventBus.$on(ClusteringChanged, x => privateState.cluster = x);
    }
});
