import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import CodeToggle from "./components/CodeToggle";
import store from "./store";
import {SetSiteLanguages} from "./store/mutations";

export default ({ Vue, options, router, siteData }) => {
    Vue.use(ElementUI);
    Vue.component("code-toggle", CodeToggle);

    store.commit(SetSiteLanguages, siteData.themeConfig.codeLanguages);
    Object.assign(options, {
        data: {
            codeLanguage: null,
        },
        store: store
    });
    // router.addRoutes([{
    //     path: '/docs/latest.html',
    //     redirect: `/${siteData.themeConfig.versions.latest}/getting-started/installation.html`
    // },
    //     {
    //         path: '/docs/latest/the-basics/schema.html',
    //         redirect: `/${siteData.themeConfig.versions.latest}/the-basics/schema.html`
    //     },
    //     {
    //         path: '/docs/latest/eloquent/getting-started.html',
    //         redirect: `/${siteData.themeConfig.versions.latest}/eloquent/getting-started.html`
    //     },
    // ])

    // Select docs version based on url path
    // Example: "/2.6/guides/installation.html" will use "2.6"
    router.afterEach((to, from) => {
        const version = to.path.split('/')[1]

        if (siteData.themeConfig.versions.all.includes(version)) {
            siteData.themeConfig.versions.selected = version
        }
    })
}
