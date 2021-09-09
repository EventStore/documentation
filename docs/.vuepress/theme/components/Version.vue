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
        const versions = __VERSIONS__.all.reduce(
          (acc, val) =>
            acc.concat(
              val.versions?.map((v) => {
                return {
                  name: `${val.group} ${v.version}`,
                  path: `/${val.basePath}/${v.path}`,
                };
              })
            ),
          []
        );
        const versionInfo = versions.find(v => path.startsWith(v.path));

        return versionInfo?.name;
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