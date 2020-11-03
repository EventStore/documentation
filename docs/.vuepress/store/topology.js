import {createStore} from "./baseStore";
import {ClusteringChanged, TcpChanged} from "./events";
import Gossip from "./gossip";

export default createStore(
    {
        state:         {
            cluster:          true,
            separateNetworks: false,
            httpPort:         2113,
            internalTcpPort:  1112,
            externalTcpPort:  1113,
            tcpEnabled:       true,
            gossip:           new Gossip("Cluster", "cluster nodes")
        },
        methods:       {
            updateClustering(value) {
                this.state.cluster = value;
                this.emit(ClusteringChanged, value);
            },
            isCluster() {
                return this.state.cluster;
            },
        },
        eventHandlers: {
            [TcpChanged]: (s, x) => s.tcpEnabled = x
        },
        init(s) {
            s.updateClustering(true);
        }
    },
    "topology"
);
