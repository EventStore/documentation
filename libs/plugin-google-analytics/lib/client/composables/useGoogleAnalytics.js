/**
 * Add gtag.js to your site
 *
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/pages
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications
 *
 * The enhanced measurement will listen to browser history events (i.e `pushState`, `popState`, and `replaceState`)
 * to collect page_view event, so we do not need to report it manually
 *
 * @see https://support.google.com/analytics/answer/9216061
 */
export const useGoogleAnalytics = (gtmId) => {
    if (!gtmId || typeof window === "undefined") {
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
};
