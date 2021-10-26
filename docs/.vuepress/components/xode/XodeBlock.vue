<template>
  <div
          class="code-group-item"
          :class="{ 'code-group-item__active': active }"
          :aria-selected="active"
  >
    <slot/>
  </div>
</template>

<script lang="ts">
import {onMounted, watch} from "vue";
import store from "./store";

function findAndReplace(node, what, replaceTo) {
    if (replaceTo === "") return;
    for (const x of node) {
        if (typeof x.children === "string") {
            if (x.children.indexOf(what) !== -1) {
                x.el.innerHTML = x.el.innerHTML.replace(what, replaceTo);
            }
        } else if (x.children !== null && x.children.length) {
            findAndReplace(x.children, what, replaceTo);
        }
    }
}

export default {
    name: 'CodeGroupItem',
    props: {
        title: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    setup(_, {slots}) {
        const apply = () => findAndReplace(slots.default(), "{connectionString}", store.state.connectionString);
        onMounted(() => apply());
        watch(store.state, () => apply())
    }
}
</script>
