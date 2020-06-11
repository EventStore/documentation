const references = require("../versions.json");
const fse = require("fs-extra");
const fs = require("fs");

const path = process.cwd();
let versions = [];

module.exports = {
    load() {
        references.forEach(p => {
            const fileName = `${path}${p}`;
            if (fs.existsSync(fileName)){
                this.info(`Importing versions from ${fileName}`);
                const list = require(fileName);
                list.forEach(v => {
                    const existing = versions.find(x => x.id === v.id);
                    if (existing === undefined) {
                        versions.push(v);
                    } else {
                        existing.versions.push(...v.versions);
                    }
                });
            } else {
                this.info(`File ${fileName} doesn't exist, ignoring`);
            }
        });
        console.log(JSON.stringify(versions));
    },
    versions: {
        // latest stable release
        get latest() {
            return `${versions[0].basePath}/${versions[0].versions[0].path}`;
        },
        get all() {
            return versions
        }
    },
    // Generate a single object that represents all versions from each sidebar
    // https://vuepress.vuejs.org/theme/default-theme-config.html#multiple-sidebars
    get sidebars() {
        let sidebars = {};

        versions.forEach(version => {
            version.versions.forEach(v => {
                let path = `${version.basePath}/${v.path}`;
                sidebars[`/${path}/`] = require(`../../${path}/sidebar.js`);
            });
        })

        return sidebars;
    },
    version(id) {
        const ret = versions.find(x => x.id === id);
        if (ret === undefined) this.error(`Version ${id} not defined`);
        return ret;
    },
    // Build dropdown items for each version
    linksFor(id, url) {
        const links = [];
        const version = this.version(id);

        version.versions.forEach(v => {
            let path = `${version.basePath}/${v.path}`;
            let item = {text: v.version, link: `/${path}/${url}`};
            links.push(item);
        });

        return links;
    },
    // Generate a new version
    generate(id, ver) {
        ver = ver || process.argv[1];
        console.log('\n')

        if (!fs.existsSync(`${path}/.vuepress/versions.json`)) {
            this.error('File .vuepress/versions.json not found')
        }

        if (typeof ver === 'undefined') {
            this.error('No version number specified! \nPass the version you wish to create as an argument.\nEx: 4.4')
        }

        // if (versions.find(x => x.id === ver !== undefined) {
        //     this.error(`This version '${ver} already exists! Specify a new version to create that does not already exist.`)
        // }

        this.info(`Generating new version into 'docs/${ver}' ...`)

        try {
            fse.copySync(`${path}/master`, `${path}/${ver}`)

            // remove 'master' from the top of list
            versions.shift()
            // add new generated version on top of list
            // versions.unshift(version)
            // add 'master' again on top of list
            // versions.unshift('master')

            // write to versions.json

            fs.writeFileSync(
                `${path}/.vuepress/versions.json`,
                `${JSON.stringify(versions, null, 2)}\n`,
            );

            // this.success(`Version '${version}' created!`)
        } catch (e) {
            this.error(e)
        }
    },
    error(message) {
        console.log("\x1b[41m%s\x1b[0m", ' ERROR ', `${message}\n`)
        process.exit(0)
    },
    info(message) {
        console.log("\x1b[44m%s\x1b[0m", ' INFO ', `${message}\n`)
    },
    success(message) {
        console.log("\x1b[42m\x1b[30m%s\x1b[0m", ' DONE ', `${message}\n`)
    }
}
