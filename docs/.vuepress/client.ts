import {defineClientConfig} from 'vuepress/client';
import "iconify-icon";

declare const __VERSIONS__: { latest: string, selected: string, all: string[] }

export default defineClientConfig({
    enhance({app, router, siteData}) {
        // Router configuration
        router.addRoute({
            path: "/latest.html",
            redirect: `/${__VERSIONS__.latest}/quick-start/`
        });
    },
})
