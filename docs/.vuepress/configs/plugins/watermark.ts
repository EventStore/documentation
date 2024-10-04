const isLegacyClient = (relPath) => relPath.includes("clients/tcp") && !relPath.includes("/migration-to-gRPC");
const isLegacyServer = (relPath) => relPath.includes("server/v5") || relPath.includes("http-api/v5");

export const watermark = {
    enabled(page) {
    const relPath = page.filePathRelative;
    if (relPath === null) return false;
    return isLegacyClient(relPath) || isLegacyServer(relPath);
},
    watermarkOptions: {
        content: "Deprecated",
            fontSize: '30px',
            globalAlpha: 0.3,
    }
}