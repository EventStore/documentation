import Vue from "vue";
import {PlatformChanged} from "./events";
import properties from "../../common/properties";
import {EventBus} from "../../common/eventBus";

const defaultPlatform = "linux";

export default new Vue({
    data() {
        return {
            platform: ""
        }
    },

    methods: {
        changePlatform(platform) {
            this.platform = platform;
            EventBus.$emit(PlatformChanged, platform);
        },
        ...properties
    },
    computed: {
        isLinux() {
            return this.platform === "linux";
        }
    },

    created() {
        this.changePlatform(defaultPlatform);
    }
});
