"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAnalyticsPlugin = void 0;
const utils_1 = require("@vuepress/utils");
const googleAnalyticsPlugin = ({ id }, app) => {
    const plugin = {
        name: '@vuepress/plugin-google-analytics',
    };
    if (!id) {
        utils_1.logger.warn(`[${plugin.name}] 'id' is required`);
        return plugin;
    }
    if (app.env.isDev) {
        return plugin;
    }
    return {
        ...plugin,
        clientAppEnhanceFiles: utils_1.path.resolve(__dirname, '../client/clientAppEnhance.js'),
        define: {
            __GA_ID__: id,
        },
    };
};
exports.googleAnalyticsPlugin = googleAnalyticsPlugin;
