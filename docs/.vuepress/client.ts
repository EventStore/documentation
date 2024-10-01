import {defineClientConfig, useRoute} from 'vuepress/client';
import "iconify-icon";
import {onMounted} from "vue";

declare const __VERSIONS__: { latest: string, selected: string, all: string[] }

const storageKey = "VUEPRESS_TAB_STORE";

const findMetaKey = (record: Array, key: string) => {
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
            if (typeof window === "undefined" || to.path === from.path) return;
            const esData = findEsMeta(to);
            const a = window.analytics;
            setTimeout(() => {
                a.page({
                    url: to.path,
                    title: to.meta.t,
                    version: esData?.version,
                    category: esData?.category,
                });
            }, 1000);
        });
    },
    setup() {
        onMounted(() => {
            const route = useRoute();
            if (route.path !== "/") return;
            // console.log(route.meta._pageChunk.data.frontmatter.head);
        });
    },
})
