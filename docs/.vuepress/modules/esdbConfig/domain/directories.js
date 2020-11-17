import Vue from "vue";
import {PlatformChanged} from "./events";
import properties from "../../common/properties";
import {EventBus} from "../../common/eventBus";

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

export default new Vue({
    data() {
        return {
            data:   "",
            index:  "",
            logs:   "",
            config: ""
        }
    },
    methods: {
        disableConfig() {
            return privateState.configDisabled;
        },
        changePlatform(platform) {
            switch (platform) {
                case "linux":
                    this.data                   = defaults.linux.data;
                    this.index                  = defaults.linux.index;
                    this.logs                   = defaults.linux.logs;
                    this.config                 = defaults.linux.config;
                    privateState.configDisabled = true;
                    break;
                case "windows":
                    this.data                   = defaults.windows.data;
                    this.index                  = defaults.windows.index;
                    this.logs                   = defaults.windows.logs;
                    this.config                 = defaults.windows.config;
                    privateState.configDisabled = false;
                    break;
            }
        },
        ...properties
    },
    created() {
        EventBus.$on(PlatformChanged, x => this.changePlatform(x));
    }
});

