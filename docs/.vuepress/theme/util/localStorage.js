import {isUndefined} from "./index";

export function setStorageValue(prefix, name, value) {
    if (isUndefined(localStorage)) {
        return;
    }
    localStorage[prefix + name] = value;
}

export function getStorageValue(prefix, name) {
    if (isUndefined(localStorage)) {
        return null;
    }
    name = prefix + name;
    if (isUndefined(localStorage[name])) {
        return null;
    }
    return localStorage[name];
}
