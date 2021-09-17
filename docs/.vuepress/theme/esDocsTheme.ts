import type {Theme} from "@vuepress/core";
import type {DefaultThemeOptions} from "@vuepress/theme-default";
import {path} from '@vuepress/utils';

export type EsDocsThemeOptions = DefaultThemeOptions;

export const esDocsTheme: Theme<EsDocsThemeOptions> = () => ({
    name: "es-docs-theme",
    extends: "@vuepress/theme-default",
    layouts: {
        Layout: path.resolve(__dirname, "layouts/Layout.vue"),
    },
});
