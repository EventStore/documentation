<template>
  <div class="content__default">
    <h1>{{ title }}</h1>

    <Pagination v-if="showPagination"/>

    <div v-for="post in pages">
      <PostCard :item="post"/>
    </div>
  </div>
</template>

<script>
import PostPreview from "@theme/components/PostPreview";
import PostCard from "@theme/components/PostCard";
import {Pagination, SimplePagination} from '@vuepress/plugin-blog/lib/client/components'
import {capitalizeFirstLetter} from "../blog";

export default {
    components: {PostPreview, Pagination, SimplePagination, PostCard},

    computed: {
        rows() {
            let r        = [];
            const perRow = 2;
            const rcount = Math.ceil(this.pages.length / perRow)
            for (let i = 0; i < rcount; i++) {
                const start = i * perRow;
                r.push(this.pages.slice(start, start + perRow));
            }
            return r;
        },
        pages() {
            return this.$pagination.pages;
        },
        showPagination() {
            return this.$pagination._paginationPages.length > 1;
        },
        title() {
            const t = capitalizeFirstLetter(this.$frontmatter.title);
            if (t.endsWith(" Tag")) return t.replace(" Tag", "");
            if (t.endsWith(" Kind")) return t.replace(" Kind", "s");

            return t;
        }
    }
}
</script>

<style scoped lang="stylus">
.blog-list
  padding: 0
  margin: 0

.blog-list__item
  list-style-type: none

.el-row
  margin-bottom: 0

  &:last-child
    margin-bottom: 0
</style>

