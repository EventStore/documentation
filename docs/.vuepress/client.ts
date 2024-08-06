import {defineClientConfig} from 'vuepress/client';
// import Layout from "./layouts/Layout.vue";

declare const __VERSIONS__: { latest: string, selected: string, all: string[] }

export default defineClientConfig({
    // layouts: {
    //     Layout,
    // },
    enhance({app, router, siteData}) {
        // Router configuration
        router.addRoute({
            path: "/latest.html",
            redirect: `/${__VERSIONS__.latest}/`
        });
    },
})
