import {defineClientConfig} from 'vuepress/client';
import "iconify-icon";
import {AnalyticsBrowser} from '@segment/analytics-next';

declare const __VERSIONS__: { latest: string, selected: string, all: string[] }

const storageKey = "VUEPRESS_TAB_STORE";

export default defineClientConfig({
    enhance({app, router, siteData}) {
        // Router configuration
        router.addRoute({
            path: '/client/:lang',
            redirect: to => {
                const stored = JSON.parse(localStorage.getItem(storageKey) ?? "{}");
                localStorage.setItem(storageKey, JSON.stringify({...stored, code: to.params.lang}));
                return '/clients/grpc/getting-started.html';
            },
        });
        router.addRoute({
            path: '/http/',
            redirect: to => {
                const apiPath = __VERSIONS__.latest.replace("server", "http-api");
                return `${apiPath}/introduction`;
            }
        });
        router.addRoute({
            path: '/latest/:pathMatch(.*)*',
            redirect: (to) => to.path.replace(/^\/latest/, `/${__VERSIONS__.latest}`)
        });
        router.addRoute({
            path: "/latest",
            redirect: `/${__VERSIONS__.latest}/quick-start/`
        });
        router.addRoute({
            path: "/latest.html",
            redirect: `/${__VERSIONS__.latest}/quick-start/`
        });
        router.afterEach((to, from) => {
            if (to.path === from.path) return;
            // console.log(`Navigating from ${from.path} to ${to.path}`);
        });
    },
})
