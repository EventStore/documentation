import directories from "../store/directories";
import caDirs from "./dirs";
import platform from "../store/platform";
import security from "../store/security";

export default function (os, ent, key) {

    const dirs    = caDirs();
    const ver     = version(os);
    const pkgmgr  = os === "ubuntu" ? "apt" : "yum";
    const safeKey = ent ? key !== "" ? `${key}@` : "<your key>@" : "";

    const installCmd = `curl -s https://${safeKey}packagecloud.io/install/repositories/EventStore/EventStore-${ent ? "Commercial" : "OSS"}
/script.deb.sh | sudo bash
sudo ${pkgmgr} install eventstore-${ent ? "commercial" : "oss"}${ver}`;

    return {
        isLinux:    platform.isLinux(),
        secure:     security.state.secure,
        selfSigned: security.isSelfSigned(),
        version:    ver,
        pkgmgr:     pkgmgr,
        certDir:    dirs.certDir,
        caDir:      dirs.caDir,
        configDir:  directories.state.config,
        installCmd: installCmd
    }
}

function version(os) {
    switch (os) {
        case "ubuntu":
            return "=20.6.1-2"
        case "centos":
            return "-20.6.1-1.el7"
        case "amazon":
            return "-20.6.1-1.amzn2"
        case "oracle":
            return "-20.6.1-1.ol7"
    }
}
