import * as fs from "fs";
import {path} from 'vuepress/utils';
import log from "./log";
import {createRequire} from 'node:module';
import references from "../versions.json";
import type {
    EsSidebarGroupOptions, EsSidebarObjectOptions,
    ImportedSidebarArrayOptions
} from "./types";

interface VersionDetail {
    version: string,
    path: string,
    startPage: string,
    preview: boolean
}

interface Version {
    id: string,
    group: string,
    basePath: string,
    versions: VersionDetail[]
}

const createSidebarItem = (item: EsSidebarGroupOptions, path: string, version: string, group: string): EsSidebarGroupOptions => {
    const xp = `/${path}/`;
    let ch = item.children as string[];
    if (item.collapsible !== undefined) {
        ch = ch.map(x => !x.startsWith('../') ? '../' + x : x);
    }
    const childPath = item.prefix ? `/${path}${item.prefix}` : xp;
    const children = ch.map(x => x.split(xp).join(""));
    return {
        ...item,
        children: children.map(x => `${childPath}${x}`),
        prefix: undefined,
        group,
        version,
        text: item.text || item.title || ""
    }
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
        console.log(releases[0])
        return `${serverDocs.basePath}/${releases[0].path}`;
    }

    get all() {
        return this.versions
    }

    // Generate a single object that represents all versions from each sidebar
    getSidebars() {
        let sidebars: EsSidebarObjectOptions = {};
        const require = createRequire(import.meta.url);

        this.versions.forEach(version => {
            version.versions.forEach(v => {
                console.log(`Processing ${JSON.stringify(v)}`);
                const p = `${version.basePath}/${v.path}`;
                const sidebarPath = path.resolve(__dirname, `../../${p}`);
                const sidebarBase = path.join(sidebarPath, "sidebar");
                const sidebarJs = `${sidebarBase}.js`;
                const sidebarCjs = `${sidebarBase}.cjs`;

                const importSidebar = (path: string) => {
                    log.info(`Importing sidebar from ${path}`);
                    const sidebar: ImportedSidebarArrayOptions = require(path);
                    sidebars[`/${p}/`] = sidebar.map(item => createSidebarItem(item, p, v.version, version.group));
                }

                if (fs.existsSync(sidebarCjs)) {
                    importSidebar(sidebarCjs);
                } else if (fs.existsSync(sidebarJs)) {
                    fs.copyFileSync(sidebarJs, sidebarCjs);
                    importSidebar(sidebarCjs);
                    fs.rmSync(sidebarCjs);
                } else {
                    log.info(`Sidebar file ${sidebarJs} not found`);
                }
            });
        })

        return sidebars;
    }

    version(id: string) {
        const ret = this.versions.find(x => x.id === id);
        if (ret === undefined) log.error(`Version ${id} not defined`);
        return ret;
    }

    // Build dropdown items for each version
    linksFor(id: string, url?: string) {
        const links: { text: string, link: string }[] = [];
        const version = this.version(id);
        if (version === undefined) return links;

        version.versions.forEach(v => {
            const path = `${version.basePath}/${v.path}`;
            const pageUrl = (url ? url : v.startPage ? v.startPage : "");
            const link = `/${path}/${pageUrl}`;
            const item = {text: v.version, link: link};
            links.push(item);
        });

        return links;
    }
}

export const instance: versioning = new versioning();
