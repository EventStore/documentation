import Deployment from "./components/Deployment";

export default {
    install(Vue) {
        console.log("Installing the config module")
        Vue.component("Deployment", Deployment);
    }
}
