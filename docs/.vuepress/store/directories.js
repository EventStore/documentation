import Vue from "vue";
import {EventBus} from "./event-bus";
import {PlatformChanged} from "./events";
import baseStore from "./baseStore";

const defaults = {
    linux:   {
        data:   "/var/lib/eventstore",
        index:  "/var/lib/eventstore/index",
        logs:   "/var/log/eventstore",
        config: "/etc/eventstore"
    },
    windows: {
        data:   "C:\\ESDB\\Data",
        index:  "C:\\ESDB\\Index",
        logs:   "C:\\ESDB\\Logs",
        config: "C:\\ESDB"
    }
};

const privateState = Vue.observable({
    configDisabled: true
});

const store = baseStore(
    {
        data:   "",
        index:  "",
        logs:   "",
        config: ""
    },
    {
        update(which, value) {
            this.state[which] = value;
        },
        disableConfig() {
            return privateState.configDisabled;
        },
        changePlatform(platform) {
            switch (platform) {
                case "linux":
                    this.state.data             = defaults.linux.data;
                    this.state.index            = defaults.linux.index;
                    this.state.logs             = defaults.linux.logs;
                    this.state.config           = defaults.linux.config;
                    privateState.configDisabled = true;
                    break;
                case "windows":
                    this.state.data             = defaults.windows.data;
                    this.state.index            = defaults.windows.index;
                    this.state.logs             = defaults.windows.logs;
                    this.state.config           = defaults.windows.config;
                    privateState.configDisabled = false;
                    break;
            }
        }
    });

EventBus.$on(PlatformChanged, x => store.changePlatform(x));

export default store;

