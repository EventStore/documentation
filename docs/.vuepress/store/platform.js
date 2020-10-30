import Vue from "vue";
import {EventBus} from "./event-bus";
import {PlatformChanged} from "./events";

const defaultPlatform = "linux";

const store = {
    state: Vue.observable({
        platform: ""
    }),

    changePlatform(platform) {
        this.state.platform = platform;
        EventBus.$emit(PlatformChanged, platform);
    }
}

setTimeout(() => store.changePlatform(defaultPlatform), 100);

export default store;
