<template>
    <div class="code-toggle">
        <ul class="code-language-switcher" v-if="showSwitcher">
            <li v-for="language in languages">
                <a :class="{ active: isActive(language) }" @click="setLanguage(language)">{{ getLanguageLabel(language) }}</a>
            </li>
        </ul>
        <div v-for="language in languages">
            <slot :name="language" v-if="isActive(language)"/>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";
    import {ChangeLanguage} from "../store/mutations";
    import {GetSelectedLanguage, GetSiteLanguages} from "../store/getters";

    export default {
        props: ["languages", "labels"],
        data: () => ({
            selectedLanguage: null,
            showSwitcher: true
        }),
        computed: {
            pageLanguages() {
                return this.$page.frontmatter.code
            },
            isPageWide() {
                return this.$page.frontmatter.split && this.pageLanguages !== undefined
            },
            language() {
                return !this.showSwitcher ? this.selectedPageLanguage : this.selectedLanguage;
            },
            shownLanguage() {
                return this.language != null && this.languages.indexOf(this.language) !== -1
                    ? this.language : this.languages[0];
            },
            ...mapGetters({
                siteLanguages: GetSiteLanguages,
                selectedPageLanguage: GetSelectedLanguage
            }),
        },
        methods: {
            isActive(lang) {
                return lang === this.shownLanguage;
            },
            ...mapMutations({
                changeLanguage: ChangeLanguage
            }),
            setLanguage(language) {
                this.selectedLanguage = language
            },
            getLanguageLabel(lang) {
                return (this.labels && this.labels[lang]) ||
                    (this.siteLanguages && this.siteLanguages[lang]) || lang;
            }
        },
        mounted() {
            this.selectedLanguage = this.shownLanguage;
            this.showSwitcher = !this.isPageWide || this.pageLanguages.indexOf(this.shownLanguage) === -1;
        }
    }
</script>
