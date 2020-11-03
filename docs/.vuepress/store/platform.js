import {PlatformChanged} from "./events";
import {createStore} from "./baseStore";

const defaultPlatform = "linux";

export default createStore(
    {
        state: {
            platform: ""
        },

        methods: {
            changePlatform(platform) {
                this.state.platform = platform;
                this.emit(PlatformChanged, platform);
            },
            isLinux() {
                return this.state.platform === "linux";
            }
        },

        init(s) {
            s.changePlatform(defaultPlatform);
        }
    }
);
