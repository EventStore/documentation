import * as strings from "../theme/util/strings";
import platform from "../store/configurator/platform";
import directories from "../store/configurator/directories";

export default function () {
    const serverSep = strings.sep(platform.platform);
    const certDir   = `${directories.config}${serverSep}certs`;
    return {
        certDir: certDir,
        caDir:   `${certDir}${serverSep}ca`
    };
}
