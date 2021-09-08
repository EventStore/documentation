<template>
  <section>
    <router-link :to="item.path">
      <h3 class="blog-post__title">{{ item.title }}</h3>
    </router-link>
    <i>Written <span v-if="item.frontmatter.author"> by {{ item.frontmatter.author }} </span>
      <time v-if="item.frontmatter.date">on {{ resolvePostDate }}</time>
    </i>
    <span v-html="getSummary"></span>
    <hr>
  </section>
</template>

<script lang="ts">
import {PageFrontmatter} from "vuepress-vite";
import { PropType } from "vue";

interface Post {
    excerpt: string;
    frontmatter: PageFrontmatter;
    title: string;
    path: string;
}

export default {
    props: {
        item: {
            type: Object as PropType<Post>,
            required: true,
        }
    },
    computed: {
        resolvePostDate() {
            return new Date(this.item.frontmatter.date).toDateString();
        },
        getSummary() {
            let valueOr = (value, formatter, alternative) => value ? formatter(value) : alternative;
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
}
</script>

<style scoped lang="stylus">
.blog-post__button
  margin-bottom: 1.5rem
  display: inline-block

.blog-post__title
  margin-top: 0.5rem
  padding-bottom: 0

.button
  border: 1px solid $accentColor
  border-radius: 4px
  color: $accentColor
  font-size: 0.8rem
  padding: 0.5rem 0.75rem
  text-transform: uppercase
  font-weight: 700
  box-shadow: 0 0
  transition: box-shadow 0.2s ease-in

  &:hover
    box-shadow 0 0 5px $accentColor
</style>
