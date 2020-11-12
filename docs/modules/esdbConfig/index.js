import Deployment from "./components/Deployment";

const install = function(Vue, opts = {}) {
    console.log("Installing the config module")
    Vue.component(Deployment);
}

export default {
    version: "0.1",
    install,
    Deployment
}
