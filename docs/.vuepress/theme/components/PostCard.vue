<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span><b>{{ item.title }}</b></span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="openPost">Open</el-button>
    </div>
    <span v-html="getSummary" class="summary"></span>
    <el-divider></el-divider>
    <div class="time">
      Written <span v-if="item.frontmatter.author"> by {{ item.frontmatter.author }} </span>
      <time v-if="item.frontmatter.date">on {{ resolvePostDate }}</time>
    </div>
  </el-card>
</template>

<script>
import PostTags from "@theme/components/PostTags";

export default {
    components: {PostTags},

    props: {
        item: {
            type:     Object,
            required: true
        }
    },

    computed: {
        resolvePostDate() {
            return new Date(this.item.frontmatter.date).toDateString();
        },
        getSummary() {
            let valueOr   = (value, formatter, alternative) => value ? formatter(value) : alternative;
            let paragraph = x => `<p>${x}</p>`;
            return valueOr(
                this.item.excerpt,
                x => x,
                valueOr(
                    this.item.frontmatter.summary,
                    paragraph,
                    paragraph(this.item.summary)
                ));
        }
    },

    methods: {
        tagPath(tag) {
            return this.$tag._metaMap[tag].path;
        },
        openPost() {
            this.$router.push(this.item.path);
        }
    }
}
</script>

<style scoped lang="stylus">
.summary
  color: #757575

.time
  color: #757575
  font-size: 14px
  font-weight: 300

.box-card
  width: 100%
</style>
