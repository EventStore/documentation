import {EventBus} from "./event-bus";
import baseStore from "./baseStore";

const DnsGossip  = "dns";
const SeedGossip = "seed";

const state = {
    cluster:          true,
    nodesCount:       3,
    minNodes:         3,
    maxNodes:         999,
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

const store = baseStore(
    state,
    {
        isDnsGossip() {
            return this.state.gossipMethod === DnsGossip;
        }
    }
);

export default store;
