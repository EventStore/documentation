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

interface resolveFunction {
    (filename: string): string;
}

function checkFile(filepath: string): boolean {
    const p = filepath.split("#");
    const basePath = path.resolve(__dirname, `../../..`);
    const filename = basePath + p[0];
    return fs.existsSync(filename);
}

function getNewPath(href: string, version: string): string {
    const placeholderPosition = href.indexOf("/");
    const base = `/${href.substring(1, placeholderPosition)}/${version}`;
    const sub = href.substring(placeholderPosition);
    return base + sub;
}

function replaceCrossLinks(token, env: MdEnv) {
    const href = token.attrGet("href");
    if (!href.startsWith("@")) return;

    const fileVersion = (version.getVersion(env.filePathRelative) ?? instance.latest.split("/")[1]).replace("v", "");

    const attemptResolve: resolveFunction[] = [
        x => x,
        x => `v${x}`,
        x => x.substring(0, x.lastIndexOf(".")),
        x => `v${x.substring(0, x.lastIndexOf("."))}`
    ];
    const candidates = ["/" + href.substring(1)];
    if (fileVersion !== undefined) {
        const versioned = attemptResolve.map(x => getNewPath(href, x(fileVersion)));
        candidates.push(...versioned);
    }
    const newRef = candidates.map(x => x.replace("//", "/")).find(x => checkFile(x));

    if (newRef === undefined) {
        logger.error(`Unable to resolve placeholder ${href.substring(0, href.indexOf("/"))} in ${href}, file ${env.filePathRelative}`);
        logger.error("tried", candidates.join(", "))
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
