<template>
  <div class="content__default">
    <h1 v-if="title">{{ title }}</h1>
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
    }
}
</script>

<style lang="stylus" scoped>
.time
  color: #757575
  font-size: 14px
  font-weight: 300
</style>
