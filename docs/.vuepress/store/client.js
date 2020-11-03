import Vue from "vue";
import {createStore} from "./baseStore";
import {SecurityChanged, TcpChanged} from "./events";
import Gossip from "./gossip";

const privateState = Vue.observable({
    secure:     true,
    selfSigned: true
});

export default createStore(
    {
        state:         {
            enableTcp:         true,
            enableAtomPub:     true,
            advertiseToClient: false,
            httpPort:          2113,
            externalTcpPort:   1113,
            gossip:            new Gossip("Client", "clients")
        },
        methods:       {
            isSecure:     () => privateState.secure,
            isSelfSigned: () => privateState.selfSigned,
            isTcpEnabled() {
                return this.state.enableTcp;
            },
            enableTcp(enable) {
                this.state.enableTcp = enable;
                this.emit(TcpChanged, enable);
            },
        },
        eventHandlers: {
            [SecurityChanged]: (s, x) => privateState.secure = x
        }
    }, "client"
);
