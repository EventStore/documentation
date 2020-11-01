import Vue from "vue";
import {createStore} from "./baseStore";
import {ClusteringChanged} from "./events";
import {isValidDns} from "../lib/networks";
import Node from "./node";
import * as networks from "../lib/networks";

function calculateNodeCount(newCount, oldCount) {
    if (newCount === oldCount) return newCount;

    const diff = newCount - oldCount;
    let count  = newCount;
    while (!(count % 2)) {
        count += diff;
    }
    return count;
}

const state = {
    nodesCount: 0,
    minNodes:   0,
    maxNodes:   0,
    nodes:      []
};

export default createStore(
    {
        state:         state,
        methods:       {
            getNode(index) {
                return this.state.nodes.find(x => x.index === index);
            },
            updateNodes(count) {
                this.state.nodesCount = calculateNodeCount(count, this.state.nodesCount);
            },
            setDefaultNodeCount(cluster) {
                let count = this.state.nodesCount;
                if (cluster) {
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
                    const node = Vue.observable(new Node(i + 1));
                    this.state.nodes.push(node);
                }
            },
            uniqueNode(prop, value) {
                return this.state.nodes.filter(x => x[prop] === value).length === 1;
            },
            validateNodeDns(prop, value) {
                if (!this.uniqueNode(prop, value)) return `${value} already used`;
                if (!isValidDns(value)) return "Invalid DNS name";
                // add CA domain name check
                // && this.ensureCaDomainMatch(value, callback);

                return null;
            },
        },
        eventHandlers: {
            [ClusteringChanged]: (s, x) => s.setDefaultNodeCount(x)
        }
    }
);
