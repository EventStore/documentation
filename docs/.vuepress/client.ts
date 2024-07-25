import {defineClientConfig} from 'vuepress/client';
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primevue/resources/primevue.css";
import "./styles/prime-theme.css";
import Card from "primevue/card";
import ToastService from 'primevue/toastservice';
import Connection from "./components/grpc-client/Connection.vue";
import Layout from "./layouts/Layout.vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

declare const __VERSIONS__: { latest: string, selected: string, all: string[] }

export default defineClientConfig({
    layouts: {
        Layout,
    },
    enhance({app, router, siteData}) {
        // Router configuration
        router.addRoute({
            path: "/latest.html",
            redirect: `/${__VERSIONS__.latest}/`
        });

        // PrimeVue components
        app.use(PrimeVue);
        app.use(ToastService);
        app.component("Tabs", TabView);
        app.component("Tab", TabPanel);
        app.component("Card", Card);

        // Connection string generator
        app.component("Connection", Connection);
    },
})
