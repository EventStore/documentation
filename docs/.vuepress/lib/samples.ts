import {logger, path} from '@vuepress/utils';
import {ResolvedImport} from "../markdown/xode/types";
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
    const def = s => {
        return {label: "", path: s}
    };

    const ext = src.split('.').pop();
    const pseudo = src.split('/');
    const includesCat = pseudo[0].startsWith('@');
    if (!includesCat && srcCat === undefined) return def(src);

    const cats = {
        "@samples": {
            "default": {
                path: "server",
                version: "{version}"
            }
        },
        "@httpapi": {
            "default": {
                path: "clients/http-api",
                version: "v5"
            }
        },
        "@grpc": {
            "cs": {
                label: "C#",
                path: "dotnet/21.6/samples"
            },
            "java": {
                label: "Java",
                path: "java/2.0.0/samples"
            },
            "js": {
                label: "JavaScript",
                path: "node/3.0.0/samples"
            },
            "ts": {
                label: "TypeScript",
                path: "node/3.0.0/samples"
            },
            "rust": {
                label: "Rust",
                path: "rust/1.0.0/samples"
            },
            "rs": {
                label: "Rust",
                path: "rust/1.0.0/samples"
            },
            "go": {
                label: "Go",
                path: "go/1.0.2/samples"
            },
        }
    };

    const isVersion = pseudo.length > 1 && version.isVersion(pseudo[1]);

    const catName = includesCat ? pseudo[0] : srcCat;
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
