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
        code:     String
    },
    computed: {
        content() {
            return this.$store.state.codeBlocks[this.code];
        }
    },
    render:   function (h) {
        console.log(this.content);

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
        return h('div', nodes);
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
