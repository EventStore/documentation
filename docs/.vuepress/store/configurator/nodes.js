import {createStore} from "../baseStore";
import {CertCnChanged, ClusteringChanged, ValidationSectionRemoved} from "./events";
import {isValidDns} from "../../lib/networks";
import Node from "./node";
import * as networks from "../../lib/networks";
import {ensureCaDomainMatch, error} from "../../lib/validate";

function calculateNodeCount(newCount, oldCount) {
    if (newCount === oldCount) return newCount;

    const diff = newCount - oldCount;
    let count  = newCount;
    while (!(count % 2)) {
        count += diff;
    }
    return count;
}

export default createStore(
    {
        state:         {
            nodesCount: 0,
            minNodes:   0,
            maxNodes:   0,
            nodes:      []
        },
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
                    this.emit(ValidationSectionRemoved, `Node ${this.state.nodes[this.state.nodes.length - 1].index}`);
                    this.state.nodes.pop();
                }

                for (let i = this.state.nodes.length; i < count; i++) {
                    const node = new Node(i + 1);
                    this.state.nodes.push(node);
                }
            },
            uniqueNode(prop, value) {
                return this.state.nodes.filter(x => x[prop] === value).length === 1;
            },
            validateNodeDns(prop, value) {
                if (!this.uniqueNode(prop, value)) return `${value} already used`;
                if (!isValidDns(value)) return "Invalid DNS name";
                if (!ensureCaDomainMatch(value, this.certCn)) return "Certificate CN mismatch";

                return null;
            },
            validateNodeIp(prop, value) {
                if (!this.uniqueNode(prop, value)) return `${value} already used`;
                if (!networks.isValidIpAddress(value)) return `${value} is not a valid IP address`;
                return null;
            },
            isSingleNode() {
                return this.nodesCount === 1;
            }
        },
        eventHandlers: {
            [ClusteringChanged]: (s, x) => s.setDefaultNodeCount(x),
            [CertCnChanged]: (s, x) => s.certCn = x
        }
    },
    "nodes"
);
