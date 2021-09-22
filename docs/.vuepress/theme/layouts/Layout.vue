<template>
  <Layout>
    <template #sidebar-top>
      <Version></Version>
    </template>
  </Layout>
</template>

<script>
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import Version from '../components/Version.vue'

export default {
  components: {
    Layout,
    Version,
  }
}
</script>

<style lang="css">
.sidebar .sidebar-links {
  padding: 0 0;
}
</style>