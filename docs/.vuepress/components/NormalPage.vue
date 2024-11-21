<template>
  <normal-page>
    <template #top>
      <div class="banner">
        <a href="https://www.eventstore.com/blog/event-store-is-evolving-to-kurrent" target="_blank">
          <img src="/rebrand-notice.png" style="max-width: 100%; height:auto；display: block; margin:0 auto;">
        </a>
      </div>
    </template>
  </normal-page>
</template>
<script>
import NormalPage from "vuepress-theme-hope/components/NormalPage.js";

export default {
  name: "announcement-banner",
  components: {
    'normal-page': NormalPage,
  }
}
</script>

<style lang="scss">
@use "../styles/palette.scss" as *; // Import the palette SCSS file

.banner {
  // background-color: var(--theme-color); // Use the CSS variable defined by theme
  // color: var(--text-color-inverse);
  padding: 20px;
  // text-align: center;
  // border-bottom: 1px solid #ddd;
}
</style>