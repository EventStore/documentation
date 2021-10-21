import {reactive} from "vue";
import keepAlive from "./keepAlive";
import gossip, {DnsGossip} from "./gossip";
import clientNode from "./clientNode";

export default {
    state: reactive({
        cluster: true,
        cloud: false,
        secure: true,
        clusterId: "",
        gossipPort: 2113,
        nodes: [],
        nodesCount: 0,
        minNodes: 1,
        maxNodes: 3,
    }),
}

export const xxx = {
    state: reactive({
        cluster: true,
        cloud: false,
        secure: true,
        // keepAlive: keepAlive,
        clusterId: "",
        // gossip: gossip,
        gossipPort: 2113,
        nodes: [],
        nodesCount: 0,
        minNodes: 1,
        maxNodes: 3,
    }),
    isDnsGossip() {
        return this.state.gossip.isDnsGossip();
    },
    changeHosting(cloud) {
        this.state.cloud = cloud;
        if (cloud) {
            this.state.gossip.setMethod(DnsGossip);
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
    changeKeepAlive(keepAlive) {
        this.state.keepAlive = keepAlive;
    },
    populateCloudNodes() {
        if (!this.state.cloud) return;

        const cloudBase = ".mesdb.eventstore.cloud";

        if (this.state.cluster) {
            this.state.gossip.dnsName = `${this.state.clusterId}${cloudBase}`;
            for (let i = 0; i < this.state.nodesCount; i++) {
                this.state.nodes[i].setAddress(`${this.state.clusterId}-${i}${cloudBase}`, 2113);
            }
        } else {
            this.state.nodes[0].setAddress(`${this.state.clusterId}${cloudBase}`, 2113);
        }
    },
    setNodesCount(count) {
        this.nodesCount = count;
        this.populateNodes();
    },
    populateNodes() {
        const count = this.state.nodesCount;
        if (this.state.nodes.length === count) return;

        while (this.state.nodes.length > count) {
            this.state.nodes.pop();
        }

        for (let i = this.state.nodes.length; i < count; i++) {
            const node = clientNode(i + 1);
            this.state.nodes.push(node);
        }
        this.populateCloudNodes();
    },
}
