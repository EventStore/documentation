import Vue from "vue";
import {createStore} from "./baseStore";
import {ClusteringChanged} from "./events";

const SelfSignedCommonName = "eventstoredb-node";
const SelfSigned           = "self-signed";

const privateState = Vue.observable({
    cluster: true
});

const store = createStore(
    {
        state:   {
            secure:         true,
            cert:           SelfSigned,
            certCommonName: SelfSignedCommonName,
        },
        methods: {
            updateCertType(type) {
                if (this.state.cert === type) return;

                this.state.cert           = type;
                this.state.certCommonName = this.isSelfSigned() ? SelfSignedCommonName : "";
            },
            isSelfSigned() {
                return this.state.cert === SelfSigned;
            },
            isCluster: () => privateState.cluster
        },
        eventHandlers: {
            [ClusteringChanged]: (s, x) => privateState.cluster = x
        }
    }
);

export default store;
