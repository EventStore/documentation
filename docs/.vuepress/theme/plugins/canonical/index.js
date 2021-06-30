import {path} from "@vuepress/shared-utils";

module.exports = options => ({
    enhanceAppFiles () {
        return [path.resolve(__dirname, "enhanceAppFile.js")];
    },
    globalUIComponents: ["Canonical"]
})
