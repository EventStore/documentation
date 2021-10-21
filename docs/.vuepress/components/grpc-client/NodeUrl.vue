<template>
  <div>
    <div>&nbsp;</div>
    <ClusterNode :node="node" :single="true"></ClusterNode>
    <div class="p-field p-grid">
      <div class="p-col-3">&nbsp;</div>
      <div class="p-col-fixed" style="width: 250px">
        <Button
                label="Fetch configuration"
                icon="pi pi-cloud-download"
                :disabled="!enableFetch"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import ClusterNode from "./ClusterNode.vue";
import clientNode from "./lib/clientNode";
import {computed} from "vue";

export default {
    name:       "NodeUrl",
    components: {ClusterNode, Button},
    setup() {
        const node = clientNode(0);
        const enableFetch = computed(() => node.canFetch())

        return {
            node,
            enableFetch
        }
    }
}
</script>

<style scoped>

</style>
