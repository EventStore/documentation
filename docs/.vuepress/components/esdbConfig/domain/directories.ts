import {reactive} from "vue";
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

const state = reactive({
    data:   "",
    index:  "",
    logs:   "",
    config: "",
    configDisabled: true
});

export default {
    state,
    ...properties,
    disableConfig() {
        return state.configDisabled;
    },
    changePlatform(platform) {
        switch (platform) {
            case "linux":
                state.data                   = defaults.linux.data;
                state.index                  = defaults.linux.index;
                state.logs                   = defaults.linux.logs;
                state.config                 = defaults.linux.config;
                state.configDisabled         = true;
                break;
            case "windows":
                state.data                   = defaults.windows.data;
                state.index                  = defaults.windows.index;
                state.logs                   = defaults.windows.logs;
                state.config                 = defaults.windows.config;
                state.configDisabled         = false;
                break;
        }
    },
    created() {
        EventBus.on(PlatformChanged, x => this.changePlatform(x));
    }
};

