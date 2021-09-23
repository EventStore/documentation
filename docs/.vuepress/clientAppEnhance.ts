import { defineClientAppEnhance } from '@vuepress/client';
import YouTube from "./components/video/YouTube.vue";
import PrimeVue from 'primevue/config';
import "./styles/prime-theme.css";
import XodeBlock from "./components/xode/XodeBlock.vue";
import XodeGroup from "./components/xode/XodeGroup";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Card from "primevue/card";
import Deployment from "./components/dummy/Deployment.vue"

declare const __VERSIONS__: { latest: string, selected: string, all: string[] }

export default defineClientAppEnhance(({ app, router, siteData }) => {
    // Router configuration
    router.addRoute({
        path: "/latest.html",
        redirect: `/${__VERSIONS__.latest}/introduction/`
    });

    // Code block components
    delete app._context.components["CodeGroup"];
    delete app._context.components["CodeGroupItem"];
    app.component("XodeBlock", XodeBlock);
    app.component("XodeGroup", XodeGroup);
    app.component(XodeBlock.name, XodeBlock);
    app.component(XodeGroup.name, XodeGroup);

    // PrimeVue components
    app.use(PrimeVue);
    app.component("TabView", TabView);
    app.component("TabPanel", TabPanel);
    app.component("Card", Card);

    // Other custom components
    app.component("YouTube", YouTube);
    app.component("Deployment", Deployment);
})
