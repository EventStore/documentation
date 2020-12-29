import directories from "../domain/directories";
import caDirs from "./dirs";
import platform from "../domain/platform";
import security from "../domain/security";

export default function (os, ent, key) {

    const dirs    = caDirs();
    const ver     = version(os);
    const pkgmgr  = os === "ubuntu" ? "apt" : "yum";
    const safeKey = ent ? key !== "" ? `${key}@` : "<your key>@" : "";

    const installCmd = `curl -s https://${safeKey}packagecloud.io/install/repositories/EventStore/EventStore-${ent ? "Commercial" : "OSS"}/script.deb.sh | sudo bash
sudo ${pkgmgr} install eventstore-${ent ? "commercial" : "oss"}${ver}`;

    return {
        isLinux:    platform.isLinux,
        secure:     security.secure,
        selfSigned: security.isSelfSigned,
        version:    ver,
        pkgmgr:     pkgmgr,
        certDir:    dirs.certDir,
        caDir:      dirs.caDir,
        configDir:  directories.config,
        installCmd: installCmd
    }
}

function version(os) {
    switch (os) {
        case "ubuntu":
            return "=20.10.0"
        case "centos":
            return "-v20.10.0-1.x80_64"
        case "amazon":
            return "-v20.10.0-1.x80_64"
        case "oracle":
            return "-v20.10.0-1.x80_64"
    }
}
