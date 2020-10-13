<template>
  <h3 class="version" v-if="hasVersion">{{ version }}</h3>
</template>

<script>
export default {
  name: "Version",

  props: ["sidebarItem"],

  computed: {
    hasVersion() {
      return this.sidebarItem !== undefined && this.sidebarItem.group !== undefined;
    },
    version() {
      const version = this.sidebarItem !== undefined ? `v${this.sidebarItem.version}` : "";
      return `${this.sidebarItem.group} ${version}`;
    }
  }
}
</script>

<style scoped lang="stylus">
h3.version
  margin: 0
  color: #0d47a1
  font-weight: 300
  font-size: 1.2em
  background: #ecf1f8

@media (min-width: 1024px)
  h3.version
    margin: 1.5rem 1.35rem 0 1.35rem

@media (min-width: 1200px)
  h3.version
    margin: 3.1rem 1.35rem 0 1.35rem

@media (min-width: 1795px)
  h3.version
    margin: 3.1rem 1.35rem 0 0
</style>
