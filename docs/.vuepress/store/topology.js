import {createStore} from "./baseStore";
import {ClusteringChanged} from "./events";

const DnsGossip  = "dns";
const SeedGossip = "seed";

const state = {
    cluster:          true,
    separateNetworks: false,
    gossipMethod:     DnsGossip,
    gossip:           "",
    httpPort:         2113,
    internalTcpPort:  1112,
    externalTcpPort:  1113,
};

export default createStore(
    {
        state:   state,
        methods: {
            updateClustering(value) {
                this.state.cluster = value;
                this.emit(ClusteringChanged, value);
            },
            isDnsGossip() {
                return this.state.gossipMethod === DnsGossip;
            },
        },
        init(s) {
            console.log("Update clustering");
            s.updateClustering(true);
        }
    }
);
