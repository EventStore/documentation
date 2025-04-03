
import { defineComponent, h, ref, computed } from "vue";
import type { FunctionalComponent, VNode } from "vue";
import { RouteLink, useSiteLocaleData, withBase, usePageFrontmatter } from "vuepress/client";
import { DropTransition } from "vuepress-theme-hope/components/transitions/index";
import ArticlesInfo from "vuepress-theme-hope/modules/blog/components/ArticlesInfo";
import CategoriesInfo from "vuepress-theme-hope/modules/blog/components/CategoriesInfo";
import {
    ArticleIcon,
    CategoryIcon,
    TagIcon,
    //  TimelineIcon,
} from "vuepress-theme-hope/modules/blog/components/icons";
import type { ThemeBlogHomePageFrontmatter } from "vuepress-theme-hope";
import TagsInfo from "vuepress-theme-hope/modules/blog/components/TagsInfo";
// import TimelineList from "@theme-hope/modules/blog/components/TimelineList";
import {
    useArticles,
    useBlogLocaleData,
    useBlogOptions,
    useCategoryMap,
    useTagMap,
} from "vuepress-theme-hope/modules/blog/composables/index";
import { useNavigate, useThemeLocaleData } from "vuepress-theme-hope/composables/index";

import "vuepress-theme-hope/modules/blog/styles/info-list.scss";
import "vuepress-theme-hope/modules/blog/styles/blogger-info.scss";

type InfoType = "article" | "category" | "tag";

const { keys } = Object

const buttons: Record<InfoType, FunctionalComponent> = {
    article: ArticleIcon,
    category: CategoryIcon,
    tag: TagIcon,
    //  timeline: TimelineIcon,
};

export default defineComponent({
    name: "InfoList",

    setup() {
        const blogLocale = useBlogLocaleData();
        const blogOptions = useBlogOptions();
        const themeLocale = useThemeLocaleData();
        const articles = useArticles();
        const categoryMap = useCategoryMap();
        const tagMap = useTagMap();
        const navigate = useNavigate();
        const frontmatter = usePageFrontmatter<ThemeBlogHomePageFrontmatter>();

        const activeType = ref<InfoType>("category");

        const { article, category, tag } = blogLocale.value;
        const countItems: [string, number, string, InfoType, FunctionalComponent][] = [
            [articles.value.path, articles.value.items.length, article, "article", buttons.article],
            [categoryMap.value.path, keys(categoryMap.value.map).length, category, "category", buttons.category],
            [tagMap.value.path, keys(tagMap.value.map).length, tag, "tag", buttons.tag],
            //[timelines.value.path, timelines.value.items.length, timeline],
        ];

        const bloggerName = computed(
            () =>
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                frontmatter.value.heroText ?? pageName

        );

        const pageName = (): string => {
            if (activeType.value === "article") { return article } else if (
                activeType.value === "category") { return category } else {
                return tag.name
            }
        };

        const bloggerAvatar = computed(
            () => blogOptions.value.avatar ?? themeLocale.value.logo,
        );

        const intro = computed(() => blogOptions.value.intro);

        return (): VNode =>

            h("aside", { class: "vp-blog-info-wrapper" }, [
                h("div", { class: "vp-blogger-info", vocab: "https://schema.org/", typeof: "Person", },
                    [
                        h("div", {
                            class: "vp-blogger",
                            ...(intro.value
                                ? {
                                    "aria-label": blogLocale.value.intro,
                                    "data-balloon-pos": "down",
                                    role: "link",
                                    onClick: (): void => {
                                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                        navigate(intro.value!);
                                    },
                                }
                                : {}),
                        },
                            [
                                bloggerAvatar.value
                                    ? h("img", {
                                        class: "vp-blogger-avatar",
                                        src: withBase(bloggerAvatar.value),
                                        property: "image",
                                        alt: "Blogger Avatar",
                                        loading: "lazy",
                                    })
                                    : null,
                                bloggerName.value
                                    ? h(
                                        "div",
                                        { class: "vp-blogger-name", property: "name" },
                                        bloggerName.value,
                                    )
                                    : null,
                                blogOptions.value.description
                                    ? h("div", {
                                        class: "vp-blogger-description",
                                        innerHTML: blogOptions.value.description,
                                    })
                                    : null,
                                intro.value
                                    ? h("meta", { property: "url", content: withBase(intro.value) })
                                    : null,
                            ],
                        ),
                        h(
                            "div",
                            { class: "vp-blog-counts" },
                            countItems.map(([path, count, locale, infoType, icon]) =>
                                h("aside", { class: "vp-blog-count" }, [
                                    h("div", {
                                        onClick: () => {
                                            activeType.value = infoType;
                                        }
                                    }, locale),
                                    h("div", {
                                        class: "count",
                                        onClick: () => {
                                            activeType.value = infoType;
                                        }
                                    }, count),
                                    h("button", {
                                        type: "button", class: "vp-blog-type-button",
                                        onClick: () => {
                                            activeType.value = infoType;
                                        },
                                    },
                                        h("div", { class: ["vp-blog-type-icon-wrapper", { active: activeType.value === infoType },], "aria-label": blogLocale.value[infoType], "data-balloon-pos": "up", },
                                            h(icon),
                                        ),
                                    ),
                                ]),
                            ),
                        ),

                    ],
                )
                ,
                h("div", { class: "vp-blog-infos" }, [



                    h(DropTransition, () =>
                        activeType.value === "article"
                            ? h(ArticlesInfo)
                            : activeType.value === "category"
                                ? h(CategoriesInfo)
                                : h(TagsInfo),
                    ),

                ]),
            ])
    },

});