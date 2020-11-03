import * as strings from "../theme/util/strings";
import platform from "../store/platform";
import directories from "../store/directories";

export default function () {
    const serverSep = strings.sep(platform.state.platform);
    const certDir   = `${directories.config}${serverSep}certs`;
    return {
        certDir: certDir,
        caDir:   `${certDir}${serverSep}ca`
    };
}
