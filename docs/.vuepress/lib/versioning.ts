import * as fs from "fs";
import {path} from 'vuepress/utils';
import log from "./log";
import {createRequire} from 'node:module';
import references from "../versions.json";

interface VersionDetail {
    version: string,
    path: string,
    startPage: string,
    preview: boolean,
    deprecated: boolean,
    hide: boolean
}

interface Version {
    id: string,
    group: string,
    basePath: string,
    versions: VersionDetail[]
}

export class versioning {
    versions: Version[] = [];

    constructor() {
        const require = createRequire(import.meta.url)
        references.forEach(p => {
            const fileName = path.resolve(__dirname, p);
            if (fs.existsSync(fileName)) {
                log.info(`Importing versions from ${fileName}`);
                const list: Version[] = require(fileName);
                list.forEach(v => {
                    const existing = this.versions.find(x => x.id === v.id);
                    if (existing === undefined) {
                        this.versions.push(v);
                    } else {
                        existing.versions.push(...v.versions);
                    }
                });
            } else {
                log.info(`File ${fileName} doesn't exist, ignoring`);
            }
        });
    }

    get latestSemver(): string {
        const serverDocs = this.versions.find(v => v.id === "server");
        if (!serverDocs) {
            throw new Error("Server docs not found");
        }
        return serverDocs.versions[0].path;
    }

    // latest stable release
    get latest(): string {
        const serverDocs = this.versions.find(v => v.id === "server");
        if (!serverDocs) {
            throw new Error("Server docs not found");
        }
        const releases = serverDocs.versions.filter(v => !v.preview);
        return `${serverDocs.basePath}/${releases[0].path}`;
    }

    get all() {
        return this.versions
    }

    // Generate a single object that represents all versions from each sidebar
    getSidebars() {
        const r = this.versions.map(v => v.versions.map(x => `/${v.basePath}/${x.path}/`)).flat();
        return r.reduce((result, curr) => ({...result, [curr]: "structure"}), {});
    }

    version(id: string) {
        const ret = this.versions.find(x => x.id === id);
        if (ret === undefined) log.error(`Version ${id} not defined`);
        return ret;
    }

    getRecords(id: string, deprecated: boolean) {
        const version = this.version(id);
        if (version === undefined) return [];
        const filter = deprecated ? (v: VersionDetail) => v.deprecated && !v.hide : (v: VersionDetail) => !v.deprecated;
        return version.versions.filter(filter);
    }

    // Build dropdown items for each version
    linksFor(id: string, deprecated: boolean) {
        const version = this.version(id);
        if (version === undefined) return [];

        const getLink = (v: VersionDetail) => {
            const path = `${version.basePath}/${v.path}`;
            const pageUrl = v.startPage ? v.startPage : "";
            return {text: v.version, link: `/${path}/${pageUrl}`};
        }
        return this.getRecords(id, deprecated).map(v => getLink(v));
    }
}

export const instance: versioning = new versioning();
