import {path} from '@vuepress/utils';
import {ResolvedImport} from "./markdown/xode/types";

const base = "../clients";

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
    const def = s => {return {label: "", path: s}};

    const ext = src.split('.').pop();
    const pseudo = src.split('/');
    const includesCat = pseudo[0].startsWith('@');
    if (!includesCat && srcCat === undefined) return def(src);

    const cats = {
        "@grpc": {
            "cs": {
                label: "C#",
                path: "dotnet/21.6/samples"
            },
            "java": {
                label: "Java",
                path: "java/1.0.0/samples"
            },
            "js": {
                label: "JavaScript",
                path: "node/2.0.0/samples"
            },
            "ts": {
                label: "TypeScript",
                path: "node/2.0.0/samples"
            },
            "rust": {
                label: "Rust",
                path: "rust/1.0.0/samples"
            },
            "rs": {
                label: "Rust",
                path: "rust/1.0.0/samples"
            }
        }
    };

    const catName = includesCat ? pseudo[0] : srcCat;
    const cat = cats[catName];
    if (cat === undefined) {
        console.log(`Unknown placeholder: ${pseudo[0]}`);
        return def(src);
    }

    const lang = cat[ext];
    if (lang === undefined) {
        console.log(`Unknown extension ${ext} in ${cat}`);
        return def(src);
    }

    const p = includesCat ? src.replace(pseudo[0], `${base}/${lang.path}`) : `${base}/${lang.path}/${src}`;

    return {label: lang.label, path: path.resolve(__dirname, p)};
}
