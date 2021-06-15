<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span><b>{{ item.title }}</b></span>
      <el-tag size="small" :type="tagType" style="margin-left: 10px">{{ item.frontmatter.kind }}</el-tag>
      <el-button class="op-button" type="text" @click="openPost">{{ buttonText }}</el-button>
    </div>
    <div class="summary">
      <span v-html="getSummary"></span>
    </div>
    <el-divider></el-divider>
    <el-row type="flex" justify="space-between">
      <el-col :span="12">
        <div class="time">
          <time v-if="item.frontmatter.date">{{ resolvePostDate }}</time>
          <br>
          <span v-if="item.frontmatter.author">{{ item.frontmatter.author }}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <PostTags :tags="item.frontmatter.tag"/>
      </el-col>
    </el-row>
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
        tagType() {
            switch (this.item.frontmatter.kind.toLowerCase()) {
                case "video":
                    return "warning";
                case "article":
                    return "";
                default:
                    return "info";
            }
        },
        buttonText() {
            return this.item.frontmatter.kind.toLowerCase() === "video" ? "Watch" : "Read";
        },
        resolvePostDate() {
            return new Date(this.item.frontmatter.date).toDateString();
        },
        getSummary() {
            const valueOr   = (value, formatter, alternative) => value ? formatter(value) : alternative;
            const paragraph = x => `<p>${x}</p>`;
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
            if (this.item.frontmatter.link) {
                window.open(this.item.frontmatter.link);
            } else {
                this.$router.push(this.item.path);
            }
        }
    }
}
</script>

<style scoped lang="stylus">
.summary
  color: #757575
  height: 7.5rem;

.time
  color: #757575
  font-size: 14px
  font-weight: 300

.box-card
  width: 100%
  margin-top: 0 !important

.op-button
  float: right
  padding: 3px 0
  font-family: museosans

.el-row
  margin-bottom: 0
  height: 1.5rem
</style>
