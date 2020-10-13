import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/element-variables.scss"
import CodeToggle from "./components/CodeToggle";
import store from "./store";
import {SetSiteLanguages} from "./store/mutations";

export default ({Vue, options, router, siteData}) => {
    Vue.use(ElementUI);
    Vue.component("code-toggle", CodeToggle);

    store.commit(SetSiteLanguages, siteData.themeConfig.codeLanguages);
    Object.assign(options, {
        data: {
            codeLanguage: null,
        },
        store: store
    });
    router.addRoutes([
        {
            path: "/latest.html",
            redirect: "/server/5.0.8/server/introduction/"
            //`/${siteData.themeConfig.versions.latest}/introduction/`
        },
    ])

    // Select docs version based on url path
    // Example: "/2.6/guides/installation.html" will use "2.6"
    router.afterEach((to, from) => {
        const version = to.path.split('/')[1]

        if (siteData.themeConfig.versions.all.includes(version)) {
            siteData.themeConfig.versions.selected = version
        }
    })
}
