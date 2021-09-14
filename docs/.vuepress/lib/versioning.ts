import * as fse from "fs-extra";
import * as fs from "fs";
import { path } from '@vuepress/utils';
import log from "./log";

const references = require("../versions.json");

function getLastPathFolder(path:string): string | undefined {
    const lastSeparatorIndex = path.lastIndexOf('/');
    if(lastSeparatorIndex === -1)
        return undefined;
    
    if(lastSeparatorIndex === path.length-1)
        path = path.slice(0,-1);

    return path.split('/').pop();
}

export class versioning {
    versions = [];

    constructor() {
        references.forEach(p => {
            const fileName = path.resolve(__dirname, p);
            if (fs.existsSync(fileName)) {
                log.info(`Importing versions from ${fileName}`);
                const list = require(fileName);
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
        const serverDocs = this.versions.find(v => v.id === "server")
        return `${serverDocs.basePath}/${serverDocs.versions[0].path}`;
    }

    get all() {
        return this.versions
    }

    // Generate a single object that represents all versions from each sidebar
    // https://vuepress.vuejs.org/theme/default-theme-config.html#multiple-sidebars
    getSidebars() {
        let sidebars = {};

        this.versions.forEach(version => {
            version.versions.forEach(v => {
                const path = v.path ? `${version.basePath}/${v.path}` : `${version.basePath}`;
                const sidebar = require(`../../${path}/sidebar.js`);
                sidebar.forEach(item => {
                    item.path = item.path ? `/${path}/${item.path}` : `/${path}/`;
                    
                    if (item.path.includes('generated')) {
                        item.children = item.children.map(
                            x => !x.startsWith('../') ? `../${x}` : x
                        );
                    }
                    
                    item.version = v.version;
                    item.group = version.group;
                    item.text = item.text || item.title;
                });
                sidebars[`/${path}/`] = sidebar;
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
        const links = [];
        const version = this.version(id);

        version.versions.forEach(v => {
            let path = !!v.path ? `${version.basePath}/${v.path}` : version.basePath;
            let item = {text: v.version, link: `/${path}/${url ? url : v.startPage ? v.startPage : ""}`};
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

        // if (versions.find(x => x.id === ver !== undefined) {
        //     this.error(`This version '${ver} already exists! Specify a new version to create that does not already exist.`)
        // }

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
