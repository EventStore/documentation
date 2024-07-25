import {fs, logger, path} from "vuepress/utils";
import version from "../lib/version";

export const resolveVersionedPath = (importPath: string, filePath: string | null | undefined) => {
    let importFilePath = importPath;
    let error: string | null = null;

    if (!path.isAbsolute(importPath)) {
        // if the importPath is a relative path, we need to resolve it
        // according to the markdown filePath
        if (!filePath) {
            logger.error(`Unable to resolve code path: ${filePath}`);
            return {
                importFilePath: null,
                error: 'Error when resolving path',
            };
        }
        importFilePath = path.resolve(filePath, '..', importPath);
    }

    if (importFilePath.includes("{version}")) {
        const ver = version.getVersion(filePath!);
        if (ver) {
            importFilePath = importFilePath.replace("{version}", ver);
        }
    }

    // // check file existence
    // if (!fs.existsSync(importFilePath)) {
    //     logger.error(`Code file can't be found: ${importFilePath}`);
    //     error = 'File not found!';
    // }

    return {importFilePath, error};
}