<template>
  <div class="content__default">
    <h1 v-if="title">{{ title }}</h1>
    <el-row type="flex" justify="space-between">
      <el-col :span="12">
        <div class="time">
          <span v-if="$frontmatter.author">{{ $frontmatter.author }} </span>
          <time v-if="$frontmatter.date">on {{ resolvePostDate }}</time>
        </div>
      </el-col>
      <el-col :span="12">
        <PostTags :tags="$frontmatter.tag"/>
      </el-col>
    </el-row>
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

<style lang="stylus" scoped>
.time
  color: #757575
  font-size: 14px
  font-weight: 300
</style>
