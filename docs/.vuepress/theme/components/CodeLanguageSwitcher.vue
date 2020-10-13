<template>
  <ul class="code-language-switcher">
    <li v-for="l in pageLanguages">
      <a :class="{ active: selectedLanguage === l }"
         @click="changeLanguage(l)"
      >
        {{ siteLanguages[l] }}
      </a>
    </li>
  </ul>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {GetSelectedLanguage, GetSiteLanguages} from "../store/getters";
import {ChangeLanguage} from "../store/mutations";

export default {
  computed: {
    pageLanguages: function () {
      return this.$page.frontmatter.code;
    },
    ...mapGetters({
      siteLanguages: GetSiteLanguages,
      selectedLanguage: GetSelectedLanguage
    }),
  },
  methods: {
    ...mapMutations({
      changeLanguage: ChangeLanguage
    })
  },
  mounted() {
    if (this.selectedLanguage == null) {
      this.changeLanguage(this.pageLanguages[0]);
    }
  }
}
</script>
