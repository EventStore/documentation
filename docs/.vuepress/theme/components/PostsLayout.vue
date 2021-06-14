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
        pages() {
            return this.$pagination.pages
        },
        showPagination() {
            return this.$pagination._paginationPages.length > 1;
        },
        title() {
            return capitalizeFirstLetter(this.$frontmatter.title.replace(" Tag", ""));
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
</style>

