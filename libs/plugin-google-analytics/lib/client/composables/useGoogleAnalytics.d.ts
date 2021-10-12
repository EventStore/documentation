declare const dataLayer: any[];
declare const gtag: (...args: any[]) => void;
declare global {
    interface Window {
        dataLayer?: typeof dataLayer;
        gtag?: typeof gtag;
    }
}
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
export declare const useGoogleAnalytics: (id: string) => void;
export {};
