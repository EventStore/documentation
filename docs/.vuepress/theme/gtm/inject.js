import GtmPlugin from "./index";

export function addGtm(router, Vue, gtmId) {
    if (!(gtmId && typeof window !== undefined)) {
        return;
    }

    (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            "gtm.start": new Date().getTime(), event: "gtm.js"
        });
        const f = d.getElementsByTagName(s)[0];
        const j = d.createElement(s), dl = l !== "dataLayer" ? `&l=${l}` : "";
        j.async = true;
        j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
        f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", gtmId);

    Vue.prototype.$gtm = Vue.gtm = new GtmPlugin();
    router.afterEach(function (to) {
        Vue.prototype.$gtm.trackView(to.name, to.fullPath);
    })
}
