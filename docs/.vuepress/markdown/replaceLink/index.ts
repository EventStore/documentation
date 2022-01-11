import {PluginWithOptions} from "markdown-it";
import {fs, logger, path} from "@vuepress/utils";
import version from "../../lib/version";
import {instance} from "../../lib/versioning";

export interface ReplaceLinkPluginOptions {
    replaceLink?: (link: string, env: any) => string;
}

interface MdEnv {
    base: string;
    filePath: string;
    filePathRelative: string;
}

function getVersion(path: string): string | undefined {
    const ref = path.split("#")[0];
    const split = ref.split("/");
    return split.find(x => version.isVersion(x));
}

function checkFile(filepath: string): boolean {
    const p = filepath.split("#");
    const basePath = path.resolve(__dirname, `../../..`);
    const filename = basePath + p[0];
    return fs.existsSync(filename);
}

function tryGetNewPath(href: string, version: string): string | undefined {
    const placeholderPosition = href.indexOf("/");
    const base = `/${href.substring(1, placeholderPosition)}/${version}`;
    const sub = href.substring(placeholderPosition);

    const result = base + sub;
    return checkFile(result) ? result : undefined;
}

function replaceCrossLinks(token, env: MdEnv) {
    const href = token.attrGet("href");
    if (!href.startsWith("@")) return;

    const fileVersion = getVersion(env.filePathRelative) ?? instance.latest.split("/")[1];

    const newRef = ((fileVersion === undefined ? undefined :
        tryGetNewPath(href, fileVersion)
        ?? tryGetNewPath(href, `v${fileVersion}`)
        ?? tryGetNewPath(href, fileVersion.substring(0, fileVersion.lastIndexOf(".")))
        ?? tryGetNewPath(href, `v${fileVersion.substring(0, fileVersion.lastIndexOf("."))}`)) ?? "/" + href.substring(1))
        .replace("//", "/");

    if (!checkFile(newRef)) {
        logger.warn(fileVersion, newRef)
        logger.error(`Unable to resolve placeholder ${href.substring(0, href.indexOf("/"))} in ${href}, file ${env.filePathRelative}`);
        return;
    }
    token.attrSet("href", newRef);
}

export const replaceLinkPlugin: PluginWithOptions<ReplaceLinkPluginOptions> = (md, opts) => {
    md.core.ruler.after(
        "inline",
        "replace-link",
        (state) => {
            if (opts?.replaceLink === undefined) return false;

            const replaceAttr = (token, attrName) => token.attrSet(attrName, opts.replaceLink(token.attrGet(attrName), state.env));

            state.tokens.forEach((blockToken) => {
                if (!(blockToken.type === "inline" && blockToken.children)) {
                    return;
                }

                blockToken.children.forEach((token) => {
                    const type = token.type;
                    switch (type) {
                        case "link_open":
                            replaceAttr(token, "href")
                            replaceCrossLinks(token, state.env);
                            break;
                        case "image":
                            replaceAttr(token, "src")
                            break;
                    }
                })
            })
        }
    )
}
