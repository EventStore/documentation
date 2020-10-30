import {EventBus} from "./event-bus";
import baseStore from "./baseStore";
import {ClusteringChanged} from "./events";

const DnsGossip  = "dns";
const SeedGossip = "seed";

const state = {
    cluster:          true,
    nodesCount:       0,
    minNodes:         0,
    maxNodes:         0,
    separateNetworks: false,
    gossipMethod:     DnsGossip,
    gossip:           "",
    nodes:            [
        {
            index:         1,
            intIp:         "",
            extIp:         "",
            dnsName:       "",
            clientDnsName: "",
        }],
    httpPort:         2113,
    internalTcpPort:  1112,
    externalTcpPort:  1113,
};

function calculateNodeCount(newCount, oldCount) {
    if (newCount === oldCount) return newCount;

    const diff = newCount - oldCount;
    let count = newCount;
    while (!(count % 2)) {
        count += diff;
    }
    return count;
}

const store = baseStore(
    state,
    {
        updateClustering(value) {
            this.state.cluster = value;
            this.setDefaultNodeCount();
            EventBus.$emit(ClusteringChanged, value);
        },
        updateNodes(count) {
            this.state.nodesCount = calculateNodeCount(count, this.state.nodesCount);
        },
        setDefaultNodeCount() {
            let count = this.state.nodesCount;
            if (this.state.cluster) {
                if (count < 3) count = 3;
                this.state.minNodes = 3;
                this.state.maxNodes = 999;
            } else {
                if (count > 1) count = 1;
                this.state.minNodes = 1;
                this.state.maxNodes = 1;
            }
            if (count !== this.state.nodesCount) {
                this.state.nodesCount = count;
                this.populateNodes()
            }
        },
        populateNodes() {
            const count = this.state.nodesCount;
            if (this.state.nodes.length === count) return;

            while (this.state.nodes.length > count) {
                // delete this.formErrors[`Node ${this.topology.nodes[this.topology.nodes.length - 1].index}`]
                this.state.nodes.pop();
            }

            for (let i = this.state.nodes.length; i < count; i++) {
                const node = {index: i + 1, dnsName: "", intIp: "", extIp: "", clientDnsName: ""};
                this.state.nodes.push(node);
            }
        },
        isDnsGossip() {
            return this.state.gossipMethod === DnsGossip;
        }
    }
);

setTimeout(() => store.updateClustering(true), 100);

export default store;
