<template #sidebar-top>
    <h4 class="version">{{ version ?? sidebarHeader }}</h4>
    <hr/>
</template>

<script>
import {resolveSidebarItems} from '@vuepress/theme-default/lib/client/composables/useSidebarItems.js'

export default {
  name: 'Version',
  computed: {
    sidebarHeader() {
        return resolveSidebarItems(this.$page.frontmatter, this.$themeLocale)[0]?.header;
    },
    version() {
        const path = this.$page.path;

        const sidebar = this.$theme.sidebar;

        var versionInfo = Object.keys(sidebar)
          .map(key => { 
            return { 
              path: key, 
              name: sidebar[key].map(v => [v.group, v.version].filter(Boolean).join(" "))[0] 
            }; 
          })
          .find(v => path.startsWith(v.path));

        return versionInfo?.name ?? "";
    }
  }
}
</script>

<style lang="css">
.version {
  margin: 1em 1em 1em 25px;
  padding: 0;
  font-weight: bold;
}
hr {
  margin-bottom: 0;
}
</style>