import {domain, clientId} from "./auth_config.json";
import {useAuth0} from "./plugin";

export default {
    async mounted() {
        const options = {
            domain,
            clientId,
            onRedirectCallback: appState => {
                this.$router.push(
                    appState && appState.targetUrl
                        ? appState.targetUrl
                        : window.location.pathname
                );
            }
        };

        this.$auth = useAuth0(options);
        await this.$auth.init();
    }
}
