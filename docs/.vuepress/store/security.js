import Vue from "vue";
import baseStore from "./baseStore";
import {ClusteringChanged} from "./events";
import {EventBus} from "./event-bus";

const SelfSignedCommonName = "eventstoredb-node";
const SelfSigned           = "self-signed";

const privateState = Vue.observable({
    cluster: true
});

const store = baseStore({
        secure:         true,
        cert:           SelfSigned,
        certCommonName: SelfSignedCommonName,
    },
    {
        updateCertType(type) {
            if (this.state.cert === type) return;

            this.state.cert = type;
            this.state.certCommonName = this.isSelfSigned() ? SelfSignedCommonName : "";
        },
        isSelfSigned() {
            return this.state.cert === SelfSigned;
        },
        isCluster: () => privateState.cluster
    }
);

EventBus.$on(ClusteringChanged, x => privateState.cluster = x);

export default store;
