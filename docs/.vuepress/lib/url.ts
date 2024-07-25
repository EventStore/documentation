export function getUrlParamValue(name: string) {
    if (typeof window === "undefined") {
        return null;
    }
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}