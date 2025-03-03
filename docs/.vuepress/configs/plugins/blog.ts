import { BlogOptions } from '@vuepress/plugin-blog';

export const blogOptions: BlogOptions = {

    value: {name: "Kurrent Guides"},

    filter: ({ filePathRelative, frontmatter }) => {
        // If the page does not come from a file, don't add it.
        if (filePathRelative == null) return false

        // drop directory and files in `resources/tutorials/images` directory
        if (filePathRelative.startsWith('resources/tutorials/images')) return false

        // drop directory and files in `resources/guides/images` directory
        if (filePathRelative.startsWith('resources/guides/images')) return false

        // drop directory and files in `resources/snippets` directory
        if (filePathRelative.startsWith('resources/snippets')) return false

        // drop those pages in `resources/` directory
        if (filePathRelative.startsWith('resources/')) return true

        return false
    },

        getInfo: ({ frontmatter, title, git = {}, data = {} }) => {
            // getting page info
            const info: Record<string, unknown> = {
                title,
                author: frontmatter.author || '',
                categories: frontmatter.categories || [],
                date: frontmatter.date || git.createdTime || null,
                tags: frontmatter.tags || [],
                excerpt: data.excerpt || '',
            }

            return info
        },
        type: [
            {
                key: "tutorial",
                filter: (page) => Boolean(page.filePathRelative?.includes("tutorials/")),
                path: "/resources/tutorials/",
                frontmatter: () => ({title: "Tutorials", heroText: "Tutorials"}),
                layout: "BlogType",
            },
            {
                key: "guide",
                filter: (page) => Boolean(page.filePathRelative?.includes("guides/")),
                path: "/resources/guides/",
                frontmatter: () => ({title: "Guides", heroText: "Guides"}),
                layout: "BlogType",
            }
        ]
    
}