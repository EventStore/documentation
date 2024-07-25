import {type ClusterNode, clusterNode} from "./clientNode";
import {reactive} from "vue";
import type {UnwrapNestedRefs} from "@vue/reactivity";
import {GossipMethod} from "./enums";

interface ConnectionState {
    cluster: boolean;
    secure: boolean;
    nodes: ClusterNode[];
    nodesCount: number;
    minNodes: number;
    maxNodes: number;
}

interface GossipState {
    method: GossipMethod;
    dnsName: string;
    port: number;
}

export interface Connection {
    state: UnwrapNestedRefs<ConnectionState>;
    gossip: UnwrapNestedRefs<GossipState>;

    isDnsGossip(): boolean;

    setGossipMethod(method: GossipMethod): void;

    setGossipPort(port: number): void;

    setNodesCount(count: number): void;

    setNodeAddress(index: number, address: string, port: number): void;

    populateNodes(): void;

    changeSecurity(secure: boolean): void;

    changeTopology(cluster: boolean): void;

    calculateConnectionString(): { result?: string, query?: string[] };
}

function safe(v: string | undefined) {
    return v !== undefined && v !== "" ? v : "[not provided]";
}

export const getEmptyConnection = (cluster: boolean): Connection => {
    const conn: Connection = {
            state: reactive<ConnectionState>({
                cluster: false,
                secure: true,
                nodes: [],
                nodesCount: 0,
                minNodes: 1,
                maxNodes: 3,
            }),
            gossip: reactive<GossipState>({
                method: GossipMethod.Dns,
                dnsName: "",
                port: 2113
            }),
            isDnsGossip(): boolean {
                return this.gossip.method === GossipMethod.Dns;
            },
            setGossipMethod(method) {
                this.gossip.method = method;
            },
            setGossipPort(port: number): void {
                this.gossip.port = port;
            },
            setNodesCount(count) {
                this.state.nodesCount = count;
                this.populateNodes();
            },
            setNodeAddress(index: number, address: string, port: number) {
                this.state.nodes[index].setAddress(address, port);
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
            calculateConnectionString(): { result?: string, query?: string[] } {
                const isDns = this.isDnsGossip();
                if (!isDns && this.state.nodes.some(x => x.state.address === "")) return {};

                const gossip = isDns
                    ? `${safe(this.gossip.dnsName)}:${this.gossip.port}`
                    : this.state.nodes.map(x => `${safe(x.state.address)}:${x.state.port}`).join(",");
                const scheme = isDns ? "esdb+discover" : "esdb";

                const result = gossip && gossip !== "" ? `${scheme}://${gossip}` : undefined;
                const query = this.state.secure ? [] : ["tls=false"];
                return {
                    result,
                    query
                }
            }
        }
    ;
    conn.changeTopology(cluster);
    return conn;
}

const connection = getEmptyConnection(true);

export default connection;
