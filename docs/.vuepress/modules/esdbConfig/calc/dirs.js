import * as strings from "../../common/strings";
import platform from "../domain/platform";
import directories from "../domain/directories";

export default function () {
    const serverSep = strings.sep(platform.platform);
    const certDir   = `${directories.config}${serverSep}certs`;
    return {
        certDir: certDir,
        caDir:   `${certDir}${serverSep}ca`
    };
}
