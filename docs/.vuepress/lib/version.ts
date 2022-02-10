const versionRegex = /v((\d+\.)?(\d+\.)?(\*|\d+))/;
const v = {
    isVersion: (v: string) => versionRegex.test(v),
    parseVersion: (v: string) => versionRegex.exec(v),
    getVersion: (path: string): string | undefined => {
        const ref = path.split("#")[0];
        const split = ref.split("/");
        return split.find(x => v.isVersion(x));
    }
};
export default v;
