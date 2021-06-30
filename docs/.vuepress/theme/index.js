const removeMd = require('remove-markdown');

module.exports = (themeConfig, ctx) => {
    themeConfig = Object.assign(
        themeConfig,
        {
            summary: themeConfig.summary === undefined ? true : themeConfig.summary,
            summaryLength: typeof themeConfig.summaryLength === 'number' ? themeConfig.summaryLength : 200,
        }
    );

    const defaultBlogPluginOptions = {
        directories: [
            {
                id: 'post',
                dirname: '_posts',
                path: '/resources/',
                layout: "BlogLayout",
                itemLayout: 'BlogLayout',
                frontmatter: {
                    title: "Resources",
                },
                pagination: {
                    lengthPerPage: 20,
                    layout: "BlogLayout",
                },
                itemPermalink: '/resources/:slug',
            },
        ],
        frontmatters: [
            {
                id: "tag",
                keys: ['tag', 'tags'],
                path: '/resources/tag/',
                layout: 'BlogLayout',
                scopeLayout: "BlogLayout",
                frontmatter: {
                    title: "Categories",
                    type: "tag"
                },
                pagination: {
                    lengthPerPage: 20,
                    layout: "BlogLayout",
                }
            },
            {
                id: "kind",
                keys: ['kind'],
                path: '/resources/kind/',
                layout: 'BlogLayout',
                scopeLayout: "BlogLayout",
                frontmatter: {
                    title: "Kinds",
                    type: "kind"
                },
                pagination: {
                    lengthPerPage: 20,
                    layout: "BlogLayout",
                }
            },
        ]
    };

    const {modifyBlogPluginOptions} = themeConfig;

    const blogPluginOptions = typeof modifyBlogPluginOptions === 'function'
        ? modifyBlogPluginOptions(defaultBlogPluginOptions)
        : defaultBlogPluginOptions;

    const plugins = [
        [
            '@vuepress/blog',
            blogPluginOptions,
        ]
    ];

    const config = {
        plugins,
        extend: '@vuepress/theme-default'
    };

    config.extendPageData = function (pageCtx) {
        const strippedContent = pageCtx._strippedContent;
        if (!strippedContent) return;

        pageCtx.summary = removeMd(
            strippedContent
                .trim()
                .replace(/^#+\s+(.*)/, '')
                .slice(0, themeConfig.summaryLength)
        ) + ' ...';
    };

    return config;
};
