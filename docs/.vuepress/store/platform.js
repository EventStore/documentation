import {PlatformChanged} from "./events";
import {createStore} from "./baseStore";

const defaultPlatform = "linux";

const store = createStore(
    {
        state: {
            platform: ""
        },

        methods: {
            changePlatform(platform) {
                this.state.platform = platform;
                this.emit(PlatformChanged, platform);
            }
        },

        init(s) {
            s.changePlatform(defaultPlatform);
        }
    }
);

export default store;
