export function safe(v){
    return v !== undefined && v !== "" ? v : "[not provided]";
}

export function safeJoin(list) {
    return [...new Set(list)].map(x => safe(x)).join(",");
}

export function sep(platform) {
    return platform === "windows" ? "\\" : "/";
}
