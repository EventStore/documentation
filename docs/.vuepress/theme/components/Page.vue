<template>
  <main class="page">

    <slot name="top"/>
    <Content class="theme-default-content"/>
    <PageEdit/>

    <PageNav v-bind="{ sidebarItems }"/>

    <slot name="bottom"/>
  </main>
</template>

<script>
import PageEdit from "@theme/components/PageEdit.vue";
import PageNav from "@theme/components/PageNav.vue";

export default {
  components: {PageEdit, PageNav},
  props: ["sidebarItems"],
  computed: {
    usePageToggle() {
      return this.$page.frontmatter.split && this.$page.frontmatter.code !== undefined
    }
  },
}
</script>

<style lang="stylus">
@require "../styles/wrapper.styl"

.page
  padding-bottom: 2rem
  display: block

</style>
