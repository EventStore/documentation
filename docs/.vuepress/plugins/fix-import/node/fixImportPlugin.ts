import type {Plugin} from "@vuepress/core";
import {logger, path} from "@vuepress/utils";
import {App, PageOptions} from "@vuepress/core";

function fixPermalink(filePath: string, source: string): string {
    const html = path.changeExt(filePath
            .replace("generated/", "")
            .replace("docs/", "")
        , "html");
    logger.info(html)
    return "/" + html;
}

export interface FixImportPluginOptions {
}

export const fixImportPlugin: Plugin<FixImportPluginOptions> = ({}, app) => {
    return {
        name: "fix-import-plugin",
        extendsPageOptions: async (options: PageOptions, app: App) => {
            const source = app.dir.source("server/generated/");
            const dest = app.dir.dest("server/generated/");
            const pub = app.dir.public("server/generated/");
            logger.info(source, dest, pub, options.filePath)
            if (options.filePath?.startsWith(source)) {
                return {
                    frontmatter: {
                        ...options.frontmatter,
                        permalink: fixPermalink(options.filePath, source)
                    },
                }
            }
            return {}
        },
    }
}
