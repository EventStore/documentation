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
            return this.$store.state[this.code];
        }
    },
    render:   function (h) {
        const find = `{{${this.code}}}`;
        const xxx  = (vNodes) => {
            return vNodes.map(x => {
                const newNode = {...x};
                if (typeof x.text == "string" && x.text.includes(find)) {
                    newNode.text = x.text.replaceAll(find, this.content);
                }
                if (x.children) {
                    newNode.children = xxx(x.children);
                }
                return newNode;
            });
        }

        const nodes = this.content ? xxx(this.$slots.default) : this.$slots.default;
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
