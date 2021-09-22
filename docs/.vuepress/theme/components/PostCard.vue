<template>
  <Card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span><b>{{ item.title }}</b></span>
      <button class="op-button" type="text" @click="openPost">{{ buttonText }}</button>
    </div>
    <div class="summary">
      <span v-html="getSummary"></span>
    </div>
  </Card>
</template>

<script>
export default {
    props: {
        item: {
            type:     Object,
            required: true
        }
    },
    computed: {
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
