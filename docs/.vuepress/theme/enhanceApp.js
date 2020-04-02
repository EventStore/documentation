import CodeToggle from "./components/CodeToggle";
import store from "./store";
import {SetSiteLanguages} from "./store/mutations";

export default ({ Vue, options, router, siteData }) => {
    Vue.component("code-toggle", CodeToggle);

    store.commit(SetSiteLanguages, siteData.themeConfig.codeLanguages);
    Object.assign(options, {
        data: {
            codeLanguage: null,
        },
        store: store
    });
}
