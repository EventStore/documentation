import * as fse from "fs-extra";
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
    startPage: string
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
    const children = ch.map(x => x.split(xp).join(""));
    return {
        ...item,
        children: children.map(x => `/${path}/${x}`),
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

    // latest stable release
    get latest(): string {
        const serverDocs = this.versions.find(v => v.id === "server");
        if (!serverDocs) {
            throw new Error("Server docs not found");
        }
        return `${serverDocs.basePath}/${serverDocs.versions[0].path}`;
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
                const p = `${version.basePath}/${v.path}`;
                const sidebarPath = path.resolve(__dirname, `../../${p}`);
                const sidebarJs = path.join(sidebarPath, "sidebar.js");
                log.info(`Importing sidebar from ${sidebarJs}`);
                const sidebar: ImportedSidebarArrayOptions = require(sidebarJs);
                sidebars[`/${p}/`] = sidebar.map(item => createSidebarItem(item, p, v.version, version.group));
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

    // Generate a new version
    generate(id: string, ver: string) {
        ver = ver || process.argv[1];
        console.log('\n')

        if (!fs.existsSync(`${path}/.vuepress/versions.json`)) {
            log.error('File .vuepress/versions.json not found')
        }

        if (typeof ver === 'undefined') {
            log.error('No version number specified! \nPass the version you wish to create as an argument.\nEx: 4.4')
        }

        log.info(`Generating new version into 'docs/${ver}' ...`)

        try {
            fse.copySync(`${path}/master`, `${path}/${ver}`)

            // remove 'master' from the top of list
            this.versions.shift()
            // add new generated version on top of list
            // versions.unshift(version)
            // add 'master' again on top of list
            // versions.unshift('master')

            // write to versions.json

            fs.writeFileSync(
                `${path}/.vuepress/versions.json`,
                `${JSON.stringify(this.versions, null, 2)}\n`,
            );

            // this.success(`Version '${version}' created!`)
        } catch (e) {
            log.error(e)
        }
    }
}

export const instance: versioning = new versioning();
