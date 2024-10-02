(function () {
    var globalAnalyticsKey = "analytics"
    var analytics = window[globalAnalyticsKey] = window[globalAnalyticsKey] || [];
    if (analytics.initialize) return;
    if (analytics.invoked) {
        if (window.console && console.error) {
            console.error("Segment snippet included twice.");
        }
        return;
    }
    analytics.invoked = true;
    analytics.methods = [
        "trackSubmit",
        "trackClick",
        "trackLink",
        "trackForm",
        "pageview",
        "identify",
        "reset",
        "group",
        "track",
        "ready",
        "alias",
        "debug",
        "page",
        "screen",
        "once",
        "off",
        "on",
        "addSourceMiddleware",
        "addIntegrationMiddleware",
        "setAnonymousId",
        "addDestinationMiddleware",
        "register"
    ];

    analytics.factory = function (e) {
        return function () {
            if (window[globalAnalyticsKey].initialized) {
                // Sometimes users assigned analytics to a variable before analytics is done loading, resulting in a stale reference.
                // If so, proxy any calls to the 'real' analytics instance.
                return window[globalAnalyticsKey][e].apply(window[globalAnalyticsKey], arguments);
            }
            var args = Array.prototype.slice.call(arguments);

            if (["track", "screen", "alias", "group", "page", "identify"].indexOf(e) > -1) {
                var c = document.querySelector("link[rel='canonical']");
                args.push({
                    __t: "bpc",
                    c: c && c.getAttribute("href") || undefined,
                    p: location.pathname,
                    u: location.href,
                    s: location.search,
                    t: document.title,
                    r: document.referrer
                });
            }

            args.unshift(e);
            analytics.push(args);
            return analytics;
        };
    };

    for (var i = 0; i < analytics.methods.length; i++) {
        var key = analytics.methods[i];
        analytics[key] = analytics.factory(key);
    }

    analytics.load = function (key, options) {
        var t = document.createElement("script");
        t.type = "text/javascript";
        t.async = true;
        t.setAttribute("data-global-segment-analytics-key", globalAnalyticsKey)
        t.src = "https://cloud.eventstore.com/segment/ajs/REDACTED";

        var first = document.getElementsByTagName("script")[0];
        first.parentNode.insertBefore(t, first);
        analytics._loadOptions = options;
    };
    analytics._writeKey = "REDACTED";
    analytics.SNIPPET_VERSION = "5.2.1";
    analytics.load("REDACTED");
    analytics.page({
        site: "docs",
        title: "Home"
    });
})();
