import {defineClientConfig, useRoute} from 'vuepress/client';
import "iconify-icon";
import {onMounted} from "vue";
import type {RouteLocationNormalized, Router} from "vue-router";
import CloudBanner from "./components/CloudBanner.vue";
import KapaWidget from './components/KapaWidget.vue';
import UserFeedback from './components/TocWithFeedback';

declare const __VERSIONS__: { latest: string, selected: string, all: string[] }

const storageKey = "VUEPRESS_TAB_STORE";

const findMetaKey = (record: any[], key: string) => {
    if (record[0] !== "meta") return null;
    const data = record[1];
    return data.name === key ? data.content : null;
}

const findMeta = (head, key) => {
    return head.map(x => findMetaKey(x, key)).find(x => x !== null);
}

const findEsMeta = (route) => {
    const head = route.meta?._pageChunk?.data?.frontmatter?.head;
    if (head === undefined) return;
    return {
        version: findMeta(head, "es:version"),
        category: findMeta(head, "es:category"),
    }
}

interface ClientConfig {
    enhance?: (context: {
        app: any;
        router: Router;
        siteData: any;
    }) => void | Promise<void>;
    setup?: () => void;
}

const removeHtml = (path: string) => path.replace(".html", "");

const reload = () => {
    if (typeof window !== "undefined") {
        setTimeout(() => {
            window.location.reload()
        }, 200);
    }
}

const leave = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (from.path !== to.path && typeof window !== "undefined" && window.analytics !== undefined) {
        // const sessionId = (typeof window.posthog !== "undefined") ? window.posthog.getSessionId() : null;
        window.analytics.track({
            event: "$pageleave",
            properties: {
                $host: window.location.hostname,
                // $session_id: sessionId
            }
        });
    }
}

export default defineClientConfig({
    enhance({app, router, siteData}) {
        app.component("CloudBanner", CloudBanner);
        app.component("KapaWidget", KapaWidget);
        app.component("UserFeedback", UserFeedback);
        const apiPath = __VERSIONS__.latest.replace("server", "http-api");
        const addFixedRoute = (from: string, to: string) => router.addRoute({
            path: from, redirect: _ => {
                reload();
                return to;
            }
        });
        const addDynamicRoute = (from: string, calc: ((to: RouteLocationNormalized) => string)) =>
            router.addRoute({
                path: from,
                redirect: to => {
                    reload();
                    return calc(to);
                }
            });

        // Router configuration
        addFixedRoute("/http-api/", `${apiPath}/introduction`);
        addFixedRoute("/cloud/", `/cloud/introduction.html`);
        router.afterEach(() => {
            setTimeout(() => { // to ensure this runs after DOM updates
                try {
                    const {code} = JSON.parse(localStorage.getItem('VUEPRESS_TAB_STORE'));
                    if (code) { // If a valid 'code' is found in localStorage
                        Array.from(document.querySelectorAll('.vp-tab-nav'))
                            .forEach((button: HTMLButtonElement) => {
                                if (button.textContent.trim() === code) {
                                    button.click(); // click the button to switch the tab
                                }
                            });
                    }
                } catch (_error) {
                    // Error is ignored
                }
            }, 0);
        });
        addDynamicRoute("/server/:version", to => `/server/${to.params.version}/quick-start/`);
        addDynamicRoute('/client/:lang',
            to => {
                const lang = to.params.lang === "csharp" ? "C#" : to.params.lang;
                const stored = JSON.parse(localStorage.getItem(storageKey) ?? "{}");
                localStorage.setItem(storageKey, JSON.stringify({...stored, code: lang}));
                return '/clients/grpc/getting-started.html';
            });
        addDynamicRoute('/latest/:pathMatch(.*)*', to => to.path.replace(/^\/latest/, `/${__VERSIONS__.latest}`));
        addFixedRoute("/server/latest", `/${__VERSIONS__.latest}/quick-start/`);
        addFixedRoute("/latest", `/${__VERSIONS__.latest}/quick-start/`);
        addFixedRoute("/latest.html", `/${__VERSIONS__.latest}/quick-start/`);

        router.afterEach((to, from) => {
            if (typeof window === "undefined" || to.path === from.path || removeHtml(to.path) === removeHtml(from.path)) return;
            const esData = findEsMeta(to);
            const a = window.analytics;
            if (a) {
                const sessionId = (typeof window.posthog !== "undefined") ? window.posthog.getSessionId() : null;
                setTimeout(() => {
                    a.page({
                        site: "docs",
                        url: window.location.origin + to.fullPath,
                        title: to.meta.t,
                        version: esData?.version,
                        category: esData?.category,
                        $host: window.location.hostname,
                        $session_id: sessionId
                    });
                }, 1000);
            }
        });
        router.beforeEach((to, from) => leave(to, from));
    },
    setup() {
        onMounted(() => {
            const route = useRoute();
            if (route.path !== "/") return;
            // console.log(route.meta._pageChunk.data.frontmatter.head);
        });

    },
} satisfies ClientConfig);
