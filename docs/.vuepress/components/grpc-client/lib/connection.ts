import {ClusterNode, clusterNode} from "./clientNode";
import {reactive} from "vue";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {FetchFrom, GossipMethod} from "./enums";

interface ConnectionState {
    fetchFrom: FetchFrom;
    cluster: boolean;
    cloud: boolean;
    secure: boolean;
    clusterId: string;
    gossipPort: number;
    nodes: ClusterNode[];
    nodesCount: number;
    minNodes: number;
    maxNodes: number;
}

export interface KeepAliveState {
    interval?: number;
    timeout?: number;
    enabled: boolean;
    min: number;
    max: number;
}

interface GossipState {
    method: GossipMethod;
    dnsName: string;
    port: number;
}

export interface Connection {
    state: UnwrapNestedRefs<ConnectionState>;
    keepAlive: UnwrapNestedRefs<KeepAliveState>;
    gossip: UnwrapNestedRefs<GossipState>;

    isDnsGossip(): boolean;

    changeHosting(fetchFrom: FetchFrom): void;

    isHosting(fetchFrom: FetchFrom): boolean;

    setGossipMethod(method: string): void;

    setNodesCount(count: number): void;

    populateNodes(): void;

    changeSecurity(secure: boolean): void;

    changeTopology(cluster: boolean): void;
}

const connection: Connection = {
    state: reactive({
        fetchFrom: FetchFrom.Cloud,
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
    keepAlive: reactive({
        interval: undefined,
        timeout: undefined,
        enabled: true,
        min: -1,
        max: Number.MAX_SAFE_INTEGER
    }),
    gossip: reactive({
        method: GossipMethod.Dns,
        dnsName: "",
        port: 2113
    }),
    isHosting(fetchFrom: FetchFrom): boolean {
        return this.state.fetchFrom === fetchFrom
    },
    isDnsGossip(): boolean {
        return this.gossip.method === GossipMethod.Dns;
    },
    changeHosting(fetchFrom) {
        if (this.state.fetchFrom === fetchFrom) return;

        this.state.fetchFrom = fetchFrom;
        this.state.cloud = fetchFrom === FetchFrom.Cloud;
        if (this.state.cloud) {
            this.setGossipMethod(GossipMethod.Dns);
            this.changeSecurity(true);
        }
    },
    setGossipMethod(method) {
        this.gossip.method = method;
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
            const node = clusterNode(i + 1);
            this.state.nodes.push(node);
        }
    },
    changeSecurity(secure) {
        this.state.secure = secure;
    },
    changeTopology(cluster) {
        this.state.cluster = cluster;
        this.setGossipMethod(GossipMethod.Dns);
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
}

connection.changeTopology(true);

export default connection;
