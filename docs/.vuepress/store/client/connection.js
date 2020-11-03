import {createStore} from "../baseStore";
import Gossip from "../shared/gossip";
import {SeedGossip} from "../shared/gossipTypes";
import ClientNode from "./clientNode";
import {safe, safeJoin} from "../../theme/util/strings";

export default createStore(
    {
        state:   {
            cluster:    true,
            cloud:      false,
            secure:     true,
            clusterId:  "",
            gossip:     new Gossip("Client", "clients", false),
            gossipPort: 2113,
            nodes:      [],
            nodesCount: 3,
            minNodes:   1,
            maxNodes:   3
        },
        methods: {
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
                        this.state.nodes[i].port    = 2113;
                    }
                } else {
                    this.state.nodes[0].address = `${this.state.clusterId}.mesdb.eventstore.cloud`;
                    this.state.nodes[0].port    = 2113;
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
            connectionString() {
                const gossip   = this.state.gossip.isDnsGossip()
                    ? `${safe(this.state.gossip.dnsName)}:${this.state.gossipPort}`
                    : safeJoin(this.state.nodes.map(x => `${x.address}:${x.port}`));
                return `esdb://${gossip}?Tls=${this.state.secure}`;
            }
        },
        init(s) {
            s.populateNodes();
        }
    }
);
