<!--<template>-->
<!--    <div-->
<!--            class="theme-code-block"-->
<!--            :class="{ 'theme-code-block__active': active }"-->
<!--    >-->
<!--      <prism :language="language" :code="content"/>-->
<!--    </div>-->
<!--</template>-->
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
    render:   function (h) {
        // const r = () => {
            const find = `{{${this.code}}}`;
            const replace  = (vNodes) => {
                return vNodes.map(x => {
                    const newNode = {...x};
                    if (typeof x.text == "string" && x.text.includes(find)) {
                        newNode.text = x.text.replaceAll(find, this.content);
                    }
                    if (x.children) {
                        newNode.children = replace(x.children);
                    }
                    return newNode;
                });
            }

            const nodes = this.content ? replace(this.$slots.default) : this.$slots.default;
        console.log(this);
            return h('div', nodes);
        // };
        //
        // if (this.$parent._isMounted) {
        //     return r();
        // } else {
        //     this.$parent.$once('hook:mounted', () => {
        //         this.$parent.$forceUpdate()
        //     })
        // }
        //
        // return r();
    }
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
