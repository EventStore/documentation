<template></template>

<script>
export default {
    created() {
        if (this.$ssrContext && this.$page.frontmatter.original) {
            console.log(`Got original: ${this.$page.frontmatter.original}`);
            this.$ssrContext.userHeadTags += `<link rel="canonical" href="${this.$page.frontmatter.original}"/>`;
        }
    }
};
</script>
