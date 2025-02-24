import type {PluginSimple} from "markdown-it";
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
    for (const line of lines) {
        if (line.includes(href)) return true;
    
        if (line.charAt(0) !== "#") continue;
    
        const lineAnchor = asAnchor(line);
        // if (enableLogs) logger.tip(lineAnchor)
        if (lineAnchor === anchor || lineAnchor.replace("--", "-") === anchor) {
            return true;
        }
    }
    
    return false;
}

function checkLink(token: MdToken, attrName: string, env: MdEnv):void {
    const href = token.attrGet(attrName);
    if (href === null) return;
    if (href.startsWith("http") || href.endsWith(".html") || env.filePathRelative.startsWith("samples")) return;
    ensureLocalLink(href, env, true);
}

export function ensureLocalLink(href: string, env: MdEnv, ignorePlaceholders: boolean): void {
    // Skip external links and properly handled VuePress aliases
    if (href.startsWith("http") || (ignorePlaceholders && href.startsWith("@"))) return;
    
    // Add additional base path patterns to this array as needed
    const knownBasePaths = ['/cloud'];
    
    // Skip checking known base paths that are resolved by VuePress router
    for (const basePath of knownBasePaths) {
        if (href.startsWith(basePath)) return;
    }
    
    // Split the link into path and anchor parts
    const split = href.split("#");
    const currentPath = href[0] === "/" ? path.resolve(__dirname, "../../..") : path.dirname(env.filePath);
    const p = path.join(currentPath, split[0]);
    
    fs.stat(p, (err, stat) => {
        // Handle file/directory not found
        if (err != null) {
            logger.error(`Broken link in ${env.filePathRelative}\r\nto: ${split[0]}`);
            return;
        }
        
        let pathToCheck = p;
        
        // Directory handling - only check if it's missing a README file
        if (stat.isDirectory()) {
            // Check if README.md exists in the directory
            const readmePath = path.join(p, "README.md");
            try {
                fs.accessSync(readmePath, fs.constants.F_OK);
                // If README.md exists, the directory link is valid
                return;
            } catch (readmeErr) {
                // Only if no README.md, check if this is an empty path (current directory)
                if (split[0] !== "") {
                    logger.error(`Broken directory link in ${env.filePathRelative}\r\nto: ${href} (no README.md found)`);
                    // It appears that some links reference a catalog, that is not indexed in the website. We need to check if that's the intended behavior
                    return;
                }
                pathToCheck = env.filePath;
            }
        }
        
        // Anchor link checking - skip known special anchors
        const knownSpecialAnchors = ['light', 'dark', 'configuration', 'security'];
        if (split.length > 1 && !split[0].endsWith(".md") && !knownSpecialAnchors.includes(split[1])) {
            let anchorResolved = findAnchor(pathToCheck, split[1]);
            
            // Find edge-case, where there are multiple anchors with the same name in the page, creating a numeric suffix
            if (!anchorResolved) {
                const match = split[1].match(/(.+)-\d+$/);
                if (match) {
                    // Attempt to resolve the anchor without the numeric suffix.
                    anchorResolved = findAnchor(pathToCheck, match[1]);
                }
            }
            
            if (!anchorResolved) {
                logger.error(
                    `Broken anchor link in ${env.filePathRelative}: ${split[1]} in file ${pathToCheck}`
                );
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
