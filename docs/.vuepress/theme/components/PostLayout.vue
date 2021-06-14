<template>
  <div class="content__default">
    <h1 v-if="title">{{ title }}</h1>
    <i>
      Written <span v-if="$frontmatter.author"> by {{ $frontmatter.author }} </span>
      <time v-if="$frontmatter.date">on {{ resolvePostDate }}</time>
    </i>
    <p></p>
    <PostTags :tags="$frontmatter.tag"/>

    <Content/>
  </div>
</template>

<script>
import PostTags from "@theme/components/PostTags";

export default {
    components: {PostTags},

    computed: {
        resolvePostDate() {
            return new Date(this.$frontmatter.date).toDateString();
        },
        title() {
            return this.$title.replace(" | " + this.$siteTitle, "")
        }
    },

    methods: {}
}
</script>

<style scoped>
</style>
