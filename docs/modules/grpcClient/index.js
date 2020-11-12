import Connection from "./components/Connection";
import ConnectionString from "./components/ConnectionString";

const install = function(Vue, opts = {}) {
    Vue.component(Connection);
    Vue.component(ConnectionString);
}

export default {
    version: "0.1",
    install,
    Connection,
    ConnectionString
}
