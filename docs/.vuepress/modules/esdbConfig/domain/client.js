import Vue from "vue";
import {SecurityChanged, TcpChanged} from "./events";
import Gossip from "../../common/gossip";
import {EventBus} from "../../common/eventBus";
import properties from "../../common/properties";

const privateState = Vue.observable({
    secure: true,
    selfSigned: true
});

export default new Vue({
    data() {
        return {
            tcpEnabled:        true,
            enableAtomPub:     true,
            advertiseToClient: false,
            httpPort:          2113,
            externalTcpPort:   1113,
            gossip:            new Gossip("Client", "clients", true)
        }
    },
    methods: {
        enableTcp(enable) {
            this.tcpEnabled = enable;
            EventBus.$emit(TcpChanged, enable);
        },
        ...properties
    },
    computed: {
        isSecure: () => privateState.secure,
        isSelfSigned: () => privateState.selfSigned,
        isTcpEnabled() {
            return this.tcpEnabled;
        },
    },
    created() {
        EventBus.$on(SecurityChanged, x => privateState.secure = x);
    }
});

