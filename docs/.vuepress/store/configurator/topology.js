import Vue from "vue";
import {ClusteringChanged, TcpChanged} from "./events";
import Gossip from "../shared/gossip";
import {EventBus} from "../eventBus";
import properties from "../properties";

export default new Vue({
    data() {
        return {
            cluster:          true,
            separateNetworks: false,
            httpPort:         2113,
            internalTcpPort:  1112,
            externalTcpPort:  1113,
            tcpEnabled:       true,
            gossip:           new Gossip("Cluster", "cluster nodes", true)
        }
    },
    methods:       {
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
        this.updateClustering(true);
        EventBus.$on(TcpChanged, x => this.tcpEnabled = x);
    }
});
