<template #sidebar-top>
  <h4 class="version">{{ version ?? "unknown" }}</h4>
  <hr/>
</template>

<script setup lang="ts">
import {useClientData} from 'vuepress/client'
import {type SidebarArrayOptions, useThemeData} from "@vuepress/theme-default/client";
import {computed} from "vue";
import type {SidebarObjectOptions} from "@vuepress/theme-default";

const {pageData} = useClientData();
const themeData = useThemeData();

const sidebar = themeData.value.sidebar as SidebarObjectOptions;

const versionInfos = computed(() => {
  if (!sidebar) return [];
  return Object.keys(sidebar)
      .filter(key => pageData.value.path.startsWith(key))
      .map(key => {
        const sb = sidebar[key] as SidebarArrayOptions;
        return {
          path: key,
          name: sb.map((v: any) => [v.group ?? v.text, v.version].filter(Boolean).join(" "))[0]
        };
      });
});

const version = computed(() => versionInfos.value.length > 0 ? versionInfos.value[0].name : "");

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