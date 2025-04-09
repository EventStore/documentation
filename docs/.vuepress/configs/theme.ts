import type {ThemeOptions} from "vuepress-theme-hope";
import {navbarEn} from "./navbar";
import {navbarLayout} from "./navbarLayout";
import plugins from "./plugins";
import {sidebarEn} from "./sidebar";

export const themeOptions: ThemeOptions = {
    logo: "/Kurrent Logo - Plum.svg",
    logoDark: "/Kurrent Logo - White.svg",
    docsDir: 'docs',
    editLink: false,
    lastUpdated: true,
    navbar: navbarEn,
    navbarLayout,
    sidebar: sidebarEn,
    toc: true,
    repo: "https://github.com/kurrent-io",
    repoLabel: "GitHub",
    repoDisplay: true,
    contributors: false,
    pure: false,
    darkmode:"toggle",
    headerDepth: 3,
    plugins,
    pageInfo: false,
    markdown: {
        figure: true,
        imgLazyload: true,
        imgMark: true,
        imgSize: true,
        tabs: true,
        codeTabs: true,
        component: true,
        mermaid: true,
        highlighter: {
            type: "shiki",
            themes: {
                light: "one-light",
                dark: "one-dark-pro",
            }
        }
    }
}

