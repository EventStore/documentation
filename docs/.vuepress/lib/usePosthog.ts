import posthog from 'posthog-js';

export function usePostHog() {
    try {
        posthog.init('phc_DeHBgHGersY4LmDlADnPrsCPOAmMO7QFOH8f4DVEVmD', {
            api_host: 'https://eu.i.posthog.com'
        });
    } catch (e) {
    }

    return {
        posthog
    }
}