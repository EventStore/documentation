import Connection from "./components/Connection";
import ConnectionString from "./components/ConnectionString";

export default {
    install(Vue, opts = {}) {
        Vue.component("Connection", Connection);
        Vue.component("ConnectionString", ConnectionString);
    }
}

export { Connection, ConnectionString }
