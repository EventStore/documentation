<template></template>

<script>
export default {
    created() {
        if (this.$ssrContext && this.$frontmatter && this.$frontmatter.original) {
            this.$ssrContext.userHeadTags += `<link rel='canonical' href='${this.$frontmatter.original}'/>`;
        }
    }
};
</script>
