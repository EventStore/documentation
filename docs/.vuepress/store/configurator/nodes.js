import Vue from "vue";
import {CertCnChanged, ClusteringChanged, ValidationSectionRemoved} from "./events";
import {isValidDns} from "../../lib/networks";
import Node from "./node";
import * as networks from "../../lib/networks";
import {ensureCaDomainMatch, error} from "../../lib/validate";
import {EventBus} from "../eventBus";
import properties from "../properties";

function calculateNodeCount(newCount, oldCount) {
    if (newCount === oldCount) return newCount;

    const diff = newCount - oldCount;
    let count  = newCount;
    while (!(count % 2)) {
        count += diff;
    }
    return count;
}

export default new Vue({
    data() {
        return {
            nodesCount: 0,
            minNodes:   0,
            maxNodes:   0,
            nodes:      [],
            certCn:     null
        }
    },
    methods: {
        getNode(index) {
            return this.nodes.find(x => x.index === index);
        },
        updateNodes(count) {
            this.nodesCount = calculateNodeCount(count, this.nodesCount);
        },
        setDefaultNodeCount(cluster) {
            let count = this.nodesCount;
            if (cluster) {
                if (count < 3) count = 3;
                this.minNodes = 3;
                this.maxNodes = 999;
            } else {
                if (count > 1) count = 1;
                this.minNodes = 1;
                this.maxNodes = 1;
            }
            if (count !== this.nodesCount) {
                this.nodesCount = count;
                this.populateNodes()
            }
        },
        populateNodes() {
            const count = this.nodesCount;
            if (this.nodes.length === count) return;

            while (this.nodes.length > count) {
                EventBus.$emit(ValidationSectionRemoved, `Node ${this.nodes[this.nodes.length - 1].index}`);
                this.nodes.pop();
            }

            for (let i = this.nodes.length; i < count; i++) {
                const node = new Node(i + 1);
                this.nodes.push(node);
            }
        },
        uniqueNode(prop, value) {
            return this.nodes.filter(x => x[prop] === value).length === 1;
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
        validateNodeAddress(prop, value) {
            if (!this.uniqueNode(prop, value)) return `${value} already used`;
            if (!networks.isValidIpAddress(value) && !networks.isValidDns(value)) return `${value} is not a valid address`;
            return null;
        },
        ...properties
    },
    computed: {
        isSingleNode() {
            return this.nodesCount === 1;
        }
    },
    created() {
        EventBus.$on(ClusteringChanged, x => this.setDefaultNodeCount(x));
        EventBus.$on(CertCnChanged, x => this.certCn = x);
    }
});
