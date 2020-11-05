import Vue from "vue";
import {createStore} from "../baseStore";
import Gossip from "../shared/gossip";
import {SeedGossip} from "../shared/gossipTypes";
import ClientNode from "./clientNode";
import {safe} from "../../theme/util/strings";
import properties from "../properties";

export default new Vue({
    data() {
        return {
            cluster: true,
            cloud: false,
            secure: true,
            clusterId: "",
            gossip: new Gossip("Client", "clients", false),
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
            this.gossip.disableGossip(cloud);
            if (cloud) {
                this.gossip.setMethod(SeedGossip);
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
            if (this.cluster) {
                for (let i = 0; i < this.nodesCount; i++) {
                    this.nodes[i].address = `${this.clusterId}-${i}.mesdb.eventstore.cloud`;
                    this.nodes[i].port = 2113;
                }
            } else {
                this.nodes[0].address = `${this.clusterId}.mesdb.eventstore.cloud`;
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

            const gossip = this.gossip.isDnsGossip()
                ? `${safe(this.gossip.dnsName)}:${this.gossipPort}`
                : this.nodes.map(x => `${safe(x.address)}:${x.port}`).join(",");
            return gossip && gossip !== "" ? `esdb://${gossip}?Tls=${this.secure}` : null;
        },
    },
    created() {
        Vue.nextTick(() => this.populateNodes());
    }
});

const x = createStore(
    {
        state: {
            cluster: true,
            cloud: false,
            secure: true,
            clusterId: "",
            gossip: new Gossip("Client", "clients", false),
            gossipPort: 2113,
            nodes: [],
            nodesCount: 0,
            minNodes: 1,
            maxNodes: 3,
            // cs: Vue.comp
        },
        methods: {
            isDnsGossip() {
                return this.state.gossip.isDnsGossip();
            },
            changeHosting(cloud) {
                this.state.cloud = cloud;
                this.state.gossip.disableGossip(cloud);
                if (cloud) {
                    this.state.gossip.setMethod(SeedGossip);
                    this.changeSecurity(true);
                }
            },
            changeTopology(cluster) {
                this.state.cluster = cluster;
                this.state.gossip.changeClustering(cluster);
                if (cluster) {
                    this.state.minNodes = 3;
                    this.state.maxNodes = 999;
                    if (this.state.nodesCount < 3) {
                        this.setNodesCount(3);
                    }
                } else {
                    this.state.minNodes = 1;
                    this.state.maxNodes = 1;
                    if (this.state.nodesCount > 1) {
                        this.setNodesCount(1);
                    }
                }
            },
            setClusterId(clusterId) {
                this.state.clusterId = clusterId;
                this.populateCloudNodes();
            },
            changeSecurity(secure) {
                this.state.secure = secure;
            },
            populateCloudNodes() {
                if (!this.state.cloud) return;
                if (this.state.cluster) {
                    for (let i = 0; i < this.state.nodesCount; i++) {
                        this.state.nodes[i].address = `${this.state.clusterId}-${i}.mesdb.eventstore.cloud`;
                        this.state.nodes[i].port = 2113;
                    }
                } else {
                    this.state.nodes[0].address = `${this.state.clusterId}.mesdb.eventstore.cloud`;
                    this.state.nodes[0].port = 2113;
                }
            },
            setNodesCount(count) {
                this.state.nodesCount = count;
                this.populateNodes();
            },
            populateNodes() {
                const count = this.state.nodesCount;
                if (this.state.nodes.length === count) return;

                while (this.state.nodes.length > count) {
                    this.state.nodes.pop();
                }

                for (let i = this.state.nodes.length; i < count; i++) {
                    const node = new ClientNode(i + 1);
                    this.state.nodes.push(node);
                }
                this.populateCloudNodes();
            },
            showConnectionString() {
                return (this.isDnsGossip() && this.state.gossip.isValid(this.state.gossipPort)) ||
                    (!this.isDnsGossip() && this.state.nodes.every(x => x.isValid()));
            },
            connectionString() {
                if (!this.showConnectionString()) return null;

                const gossip = this.state.gossip.isDnsGossip()
                    ? `${safe(this.state.gossip.dnsName)}:${this.state.gossipPort}`
                    : this.state.nodes.map(x => `${safe(x.address)}:${x.port}`).join(",");
                return gossip && gossip !== "" ? `esdb://${gossip}?Tls=${this.state.secure}` : null;
            },
        },
        init(s) {
            s.populateNodes();
        }
    }
);
