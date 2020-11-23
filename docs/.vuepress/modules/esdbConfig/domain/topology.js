import Vue from "vue";
import {CertificateTypeChanged, ClusteringChanged, TcpChanged} from "./events";
import Gossip from "../../common/gossip";
import {EventBus} from "../../common/eventBus";
import properties from "../../common/properties";

export default new Vue({
    data() {
        return {
            cluster:          true,
            separateNetworks: false,
            httpPort:         2113,
            internalTcpPort:  1112,
            externalTcpPort:  1113,
            tcpEnabled:       true,
            selfSigned:       true,
            gossip:           new Gossip("Cluster", "cluster nodes", true)
        }
    },
    methods:  {
        updateClustering(value) {
            this.cluster = value;
            EventBus.$emit(ClusteringChanged, value);
        },
        ...properties
    },
    computed: {
        isCluster() {
            return this.cluster;
        },
    },
    created() {
        Vue.nextTick(() => this.updateClustering(true));
        EventBus.$on(TcpChanged, x => this.tcpEnabled = x);
        EventBus.$on(CertificateTypeChanged, x => this.selfSigned = x);
    }
});
