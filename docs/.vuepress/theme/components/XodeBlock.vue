<template>
    <div
            class="theme-code-block"
            :class="{ 'theme-code-block__active': active }"
    >
      <prism :language="language" :code="content"/>
    </div>
</template>
<script>
export default {
    name:     'XodeBlock',
    props:    {
        title:    {
            type:     String,
            required: true
        },
        active:   {
            type:    Boolean,
            default: false
        },
        code:     String,
        language: String
    },
    computed: {
        content() {
            const c = this.$store.state.codeBlocks[this.code];
            return c ? c : "<your value>";
        }
    },
}
</script>

<style scoped>
.theme-code-block {
    display: none;
}

.theme-code-block__active {
    display: block;
}

.theme-code-block > pre {
    background-color: orange;
}
</style>
