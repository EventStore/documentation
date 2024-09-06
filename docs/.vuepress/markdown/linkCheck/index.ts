import {type PluginSimple} from "markdown-it";
import {fs, logger, path} from "vuepress/utils";
import type {MdToken} from "../types";

interface MdEnv {
    base: string;
    filePath: string;
    filePathRelative: string;
}

function findAnchor(filename: string, anchor: string): boolean {
    const asAnchor = (header: string) => header
        .replace(/[^\w\s\-']/gi, "")
        .trim()
        .toLowerCase()
        // @ts-ignore
        .replaceAll(" ", "-")
        .replaceAll("'", "-");

    // const enableLogs = filename.endsWith("v24.6/operations.md");

    const href = `<a id="${anchor}">`;
    const lines = fs.readFileSync(filename).toString().split("\n");
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes(href)) return true;

        if (line.charAt(0) != "#") continue;

        const lineAnchor = asAnchor(line);
        // if (enableLogs) logger.tip(lineAnchor)
        if (lineAnchor === anchor || lineAnchor.replace("--", "-") === anchor) return true;
    }
    return false;
}

function checkLink(token: MdToken, attrName: string, env: MdEnv) {
    const href = token.attrGet(attrName);
    if (href === null) return;
    if (href.startsWith("http") || href.endsWith(".html") || env.filePathRelative.startsWith("samples")) return;
    ensureLocalLink(href, env, true);
}

export function ensureLocalLink(href: string, env: MdEnv, ignorePlaceholders: boolean) {
    if (ignorePlaceholders && href.startsWith("@")) return;
    // check the link
    const split = href.split("#");
    const currentPath = href[0] == "/" ? path.resolve(__dirname, "../../..") : path.dirname(env.filePath);
    const p = path.join(currentPath, split[0]);
    fs.stat(p, (err, stat) => {
        if (err != null) {
            if (!href.startsWith("http")) {
                logger.error(`Broken link in ${env.filePathRelative}\r\nto: ${split[0]}`);
            }
            return;
        }
        let pathToCheck = p;
        if (stat.isDirectory()) {
            if (split[0] !== "") {
                logger.warn(`Maybe broken link to directory in ${env.filePathRelative}\r\nto: ${href}`);
                return;
            }
            pathToCheck = env.filePath;
        }
        if (split.length > 1 && !split[0].endsWith(".md)")) {
            const anchorResolved = findAnchor(pathToCheck, split[1]);
            if (!anchorResolved) {
                logger.error(`Broken anchor link in ${env.filePathRelative}: ${split[1]} in file ${pathToCheck}`);
            }
        }
    });
}

export const linkCheckPlugin: PluginSimple = (md) => {
    md.core.ruler.after(
        "inline",
        "link-check",
        (state) => {
            state.tokens.forEach((blockToken) => {
                if (!(blockToken.type === "inline" && blockToken.children)) {
                    return;
                }

                blockToken.children.forEach((token) => {
                    const type = token.type;
                    switch (type) {
                        case "link_open":
                            checkLink(token, "href", state.env);
                            break;
                        case "image":
                            checkLink(token, "src", state.env)
                            break;
                    }
                })
            })
        }
    )
}
