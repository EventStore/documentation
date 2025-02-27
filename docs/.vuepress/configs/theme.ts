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
    repo: "https://github.com/eventstore",
    repoLabel: "GitHub",
    repoDisplay: true,
    pure: false,
    darkmode:"toggle",
    headerDepth: 3,
    plugins,
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
        },
        //allow inclusion of files in markdown and promote reuse.
        include: true,
    },
    // display plurals for blog category and tag.
    blogLocales: {
        article: "Articles",
        category: "Categories",
        tag: "Tags",
      },
}

