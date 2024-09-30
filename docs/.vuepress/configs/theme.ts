import {ThemeOptions} from "vuepress-theme-hope";
import plugins from "./plugins";
import {navbarEn} from "./navbar";
import {sidebarEn} from "./sidebar";

export const themeOptions: ThemeOptions = {
    logo: "/eventstore-dev-logo-dark.svg",
    logoDark: "/eventstore-logo-alt.svg",
    docsDir: 'docs',
    editLink: false,
    lastUpdated: true,
    navbar: navbarEn,
    sidebar: sidebarEn,
    toc: true,
    pure: false,
    headerDepth: 3,
    iconAssets: "iconify",
    plugins: plugins
}
