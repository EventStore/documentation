import type {PluginWithOptions} from "markdown-it";
import {fs, logger, path} from "vuepress/utils";
import {instance} from "../../lib/versioning";
import { logInfo } from "../../util/log";
import {ensureLocalLink} from "../linkCheck";
import {resolveVersionedPath} from "../resolver";
import type {MdEnv, MdToken} from "../types";

export interface ReplaceLinkPluginOptions {
    replaceLink?: (link: string, env: MdEnv) => string;
}

type ResolveFunction = (filename: string) => string;

function checkFile(filepath: string): boolean {
    const p = filepath.split("#");
    const basePath = path.resolve(__dirname, '../../..');
    const filename = basePath + p[0];
    return fs.existsSync(filename);
}

function getNewPath(href: string, version: string): string {
    const placeholderPosition = href.indexOf("/");
    const base = `/${href.substring(1, placeholderPosition)}/${version}`;
    const sub = href.substring(placeholderPosition);
    return base + sub;
}

function replaceCrossLinks(token: MdToken, env: MdEnv): void {
    const href = token.attrGet("href");
    if (href === null) return;

    if (!href.startsWith("@")) return;

    const fileVersion = (version.getVersion(env.filePathRelative) ?? instance.latest.split("/")[1]).replace("v", "");

    const attemptResolve: ResolveFunction[] = [
        x => x,
        x => `${x}.0`,
        x => `v${x}`,
        x => `v${x}.0`,
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
    logInfo(`Resolved ${href} to ${newRef}`);
}

export const replaceLinkPlugin: PluginWithOptions<ReplaceLinkPluginOptions> = (md, opts) => {
    md.core.ruler.after(
        "inline",
        "replace-link",
        (state) => {
            if (opts?.replaceLink === undefined) return;

            const replaceAttr = (token: MdToken, attrName: string):void => {
                const link = token.attrGet(attrName)!;
                let replacement = opts.replaceLink!(link, state.env);
                if (replacement === link) return;
                if (replacement.indexOf("{version}") !== -1){
                    const r = resolveVersionedPath(replacement, state.env.filePath)
                    if (r.error !== null) {
                        logger.error(`Unable to resolve version for ${replacement} in ${state.env.filePathRelative}: ${r.error}`);
                    } else {
                        replacement = r.importFilePath!;
                    }
                }
                token.attrSet(attrName, replacement);
                logInfo(`Replaced ${link} with ${replacement}`);
            };

            state.tokens.forEach((blockToken) => {
                if (!(blockToken.type === "inline" && blockToken.children)) {
                    return;
                }

                blockToken.children.forEach((token) => {
                    const type = token.type;
                    switch (type) {
                        case "link_open": {
                            const href = token.attrGet("href");
                            if (href === null) return;
                            replaceAttr(token, "href")
                            replaceCrossLinks(token, state.env);
                            if (href.startsWith("@")) {
                                const replaced = token.attrGet("href")!;
                                ensureLocalLink(replaced, state.env, false);
                            }
                            break;
                        }
                        case "image":
                            replaceAttr(token, "src")
                            break;
                    }
                })
            });
        }
    )
}
