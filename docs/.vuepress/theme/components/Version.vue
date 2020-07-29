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
        margin-block-start: 0
        margin-block-end: 0
</style>
