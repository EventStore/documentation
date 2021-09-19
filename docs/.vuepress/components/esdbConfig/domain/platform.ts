import {computed, reactive} from "vue";
import {PlatformChanged} from "./events";
import properties from "../../common/properties";
import {EventBus} from "../../common/eventBus";

const defaultPlatform = "linux";

const state = reactive({
    platform: ""
});

export default {
    state,
    changePlatform(platform) {
        state.platform = platform;
        EventBus.emit(PlatformChanged, platform);
    },
    created() {
        this.changePlatform(defaultPlatform);
    },
    isLinux: computed(() => state.platform === "linux"),
    ...properties
};
