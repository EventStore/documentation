export function setStorageValue(prefix: string, name: string, value: string) {
    if (typeof localStorage === "undefined") {
        return;
    }
    localStorage[prefix + name] = value;
}

export function getStorageValue(prefix: string, name: string) {
    if (typeof localStorage === "undefined") {
        return null;
    }
    name = prefix + name;
    if (!localStorage[name]) {
        return null;
    }
    return localStorage[name];
}
