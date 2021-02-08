import Vue from "vue";
import Gossip from "../../common/gossip";
import {DnsGossip, SeedGossip} from "../../common/gossipTypes";
import ClientNode from "./clientNode";
import {safe} from "../../common/strings";
import properties from "../../common/properties";

export default new Vue({
    data() {
        return {
            cluster: true,
            cloud: false,
            secure: true,
            clusterId: "",
            gossip: new Gossip("Client", "clients", false, true),
            gossipPort: 2113,
            nodes: [],
            nodesCount: 0,
            minNodes: 1,
            maxNodes: 3,
        }
    },
    methods: {
        isDnsGossip() {
            return this.gossip.isDnsGossip();
        },
        changeHosting(cloud) {
            this.cloud = cloud;
            if (cloud) {
                this.gossip.setMethod(DnsGossip);
                this.changeSecurity(true);
            }
        },
        changeTopology(cluster) {
            this.cluster = cluster;
            this.gossip.changeClustering(cluster);
            if (cluster) {
                this.minNodes = 3;
                this.maxNodes = 999;
                if (this.nodesCount < 3) {
                    this.setNodesCount(3);
                }
            } else {
                this.minNodes = 1;
                this.maxNodes = 1;
                if (this.nodesCount > 1) {
                    this.setNodesCount(1);
                }
            }
        },
        setClusterId(clusterId) {
            this.clusterId = clusterId;
            this.populateCloudNodes();
        },
        changeSecurity(secure) {
            this.secure = secure;
        },
        populateCloudNodes() {
            if (!this.cloud) return;

            const cloudBase = ".mesdb.eventstore.cloud";

            if (this.cluster) {
                this.gossip.dnsName = `${this.clusterId}${cloudBase}`;
                for (let i = 0; i < this.nodesCount; i++) {
                    this.nodes[i].address = `${this.clusterId}-${i}${cloudBase}`;
                    this.nodes[i].port = 2113;
                }
            } else {
                this.nodes[0].address = `${this.clusterId}${cloudBase}`;
                this.nodes[0].port = 2113;
            }
        },
        setNodesCount(count) {
            this.nodesCount = count;
            this.populateNodes();
        },
        populateNodes() {
            const count = this.nodesCount;
            if (this.nodes.length === count) return;

            while (this.nodes.length > count) {
                this.nodes.pop();
            }

            for (let i = this.nodes.length; i < count; i++) {
                const node = new ClientNode(i + 1);
                this.nodes.push(node);
            }
            this.populateCloudNodes();
        },

        ...properties
    },
    computed: {
        showConnectionString() {
            return (this.isDnsGossip() && this.gossip.isValid(this.gossipPort)) ||
                (!this.isDnsGossip() && this.nodes.every(x => x.isValid()));
        },
        connectionString() {
            if (!this.showConnectionString) return null;

            const isDns = this.gossip.isDnsGossip();
            const gossip = isDns
                ? `${safe(this.gossip.dnsName)}:${this.gossipPort}`
                : this.nodes.map(x => `${safe(x.address)}:${x.port}`).join(",");
            const scheme = isDns ? "esdb+discover" : "esdb";
            return gossip && gossip !== "" ? `${scheme}://${gossip}?tls=${this.secure}` : null;
        },
    },
    created() {
        Vue.nextTick(() => this.populateNodes());
    }
});

