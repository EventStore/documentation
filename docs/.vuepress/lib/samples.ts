import {logger, path} from 'vuepress/utils';
import {type ResolvedImport} from "../markdown/xode/types";
import version from "./version";

const base = "../../samples";

export function resolveMultiSamplesPath(src: string): ResolvedImport[] {
    const split = src.split(':');
    const cat = split.length < 2 ? undefined : split[0];
    const paths = split.length === 1 ? src : split[1];
    return paths.split(';').map(x => {
        const r = resolveSamplesPath(x, cat);
        return {label: r.label, importPath: r.path};
    })
}

export function resolveSamplesPath(src: string, srcCat: string | undefined) {
    const def = (s: string) => {
        return {label: "", path: s}
    };

    const ext = src.split('.').pop()!;
    const pseudo = src.split('/');
    const includesCat = pseudo[0].startsWith('@');
    if (!includesCat && srcCat === undefined) return def(src);

    const cats: Record<string, Record<string, {path: string, version?: string, label?: string}>> = {
        "@samples": {
            "default": {
                path: "server",
                version: "{version}"
            }
        },
        "@httpapi": {
            "default": {
                path: "http-api",
                version: "{version}"
            }
        },
        "@grpc": {          
            "js": {
                label: "JavaScript",
                path: "clients/node/6.2.1"
            },
            "ts": {
                label: "TypeScript",
                path: "clients/node/6.2.1"
            },
            "cs": {
                label: "C#",
                path: "clients/dotnet/23.3.8"
            },
            "go": {
                label: "Go",
                path: "clients/go/1.0.0"
            },
            "rs": {
                label: "Rust",
                path: "clients/rust/4.0.1"
            },
            "py": {
                label: "Python",
                path: "clients/python/1.0.17"
            },
            "java": {
                label: "Java",
                path: "clients/java/5.4.5"
            },
        }
    };

    const isVersion = pseudo.length > 1 && version.isVersion(pseudo[1]);
    const catName: string = includesCat ? pseudo[0] : srcCat!;
    const cat = cats[catName];
    if (cat === undefined) {
        logger.warn(`Unknown placeholder: ${pseudo[0]}`);
        return def(src);
    }

    let lang = cat[ext] ?? cat["default"];
    if (lang === undefined && cat.path === undefined) {
        logger.warn(`Unknown extension ${ext} in ${cat}`);
        return def(src);
    }

    const samplesVersion = isVersion ? pseudo[1] : lang.version;
    const langPath = samplesVersion !== undefined ? `${lang.path}/${samplesVersion}` : lang.path;
    const toReplace = isVersion ? `${pseudo[0]}/${pseudo[1]}` : `${pseudo[0]}`;    

    const p = includesCat ? src.replace(toReplace, `${base}/${langPath}`) : `${base}/${langPath}/${src}`;

    return {label: lang.label, path: path.resolve(__dirname, p)};
}

export const projectionSamplesPath = "https://raw.githubusercontent.com/EventStore/EventStore/53f84e55ea56ccfb981aff0e432581d72c23fbf6/samples/http-api/data/";
