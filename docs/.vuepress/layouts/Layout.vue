<script setup lang="ts">
// @ts-ignore
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import Version from '../components/Version.vue'
</script>

<template>
  <ParentLayout>
    <template #sidebar-top>
      <Version></Version>
    </template>
  </ParentLayout>
</template>

<style lang="css">
.sidebar .sidebar-links {
  padding: 0 0;
}
</style>