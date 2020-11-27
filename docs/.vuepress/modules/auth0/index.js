import {domain, clientId} from "./auth_config.json";
import {Auth0Plugin, authGuard} from "./plugin";
import Profile from "./components/Profile";

export default function(router) {
    router.addRoutes([
        {
            path: "/profile",
            name: "profile",
            component: Profile,
            beforeEnter: authGuard
        }
    ])

    return {
        install(Vue) {
            Vue.use(Auth0Plugin, {
                domain,
                clientId,
                onRedirectCallback: appState => {
                    router.push(
                        appState && appState.targetUrl
                            ? appState.targetUrl
                            : window.location.pathname
                    );
                }
            });
        }
    }
}
