import Vue from "vue";
import {createStore} from "../baseStore";
import {SecurityChanged, TcpChanged} from "./events";
import Gossip from "../shared/gossip";
import {EventBus} from "../eventBus";
import {BaseStore} from "../base";

const privateState = Vue.observable({
    secure: true,
    selfSigned: true
});

interface ClientState {
    enableTcp: boolean,
    enableAtomPub: boolean,
    advertiseToClient: boolean,
    httpPort: number,
    externalTcpPort: number,
    gossip: Gossip
}

class ClientStore extends BaseStore<ClientState> {
    constructor() {
        super({
            enableTcp: true,
            enableAtomPub: true,
            advertiseToClient: false,
            httpPort: 2113,
            externalTcpPort: 1113,
            gossip: new Gossip("Client", "clients", true)
        });
    }

    private secure = true;
    private selfSigned = true;

    isSecure() { return this.secure }
    isSelfSigned() { return this.selfSigned }
    isTcpEnabled() { return this.state.enableTcp }
    enableTcp(enable) {
        this.state.enableTcp = enable;
        this.emit(TcpChanged, enable);
    }
}

export default createStore(
    {
        state: {
            enableTcp: true,
            enableAtomPub: true,
            advertiseToClient: false,
            httpPort: 2113,
            externalTcpPort: 1113,
            gossip: new Gossip("Client", "clients", true)
        },
        methods: {
            isSecure: () => privateState.secure,
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
    }
);

const ClientTest = new Vue({
    data() {
        return {
            enableTcp: true,
            enableAtomPub: true,
            advertiseToClient: false,
            httpPort: 2113,
            externalTcpPort: 1113,
            gossip: new Gossip("Client", "clients", true)
        }
    },
    methods: {
        isSecure: () => privateState.secure,
        isSelfSigned: () => privateState.selfSigned,
        isTcpEnabled() {
            return this.state.enableTcp;
        },
        enableTcp(enable) {
            this.state.enableTcp = enable;
            this.emit(TcpChanged, enable);
        },
    },
});

EventBus.$on(SecurityChanged, x => privateState.secure = x);
