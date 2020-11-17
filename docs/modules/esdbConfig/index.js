import Deployment from "./components/Deployment";

export default {
    install(Vue, opts = {}) {
        console.log("Installing the config module")
        Vue.component("Deployment", Deployment);
    }
}
