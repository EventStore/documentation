<template>
  <div>
    <div>&nbsp;</div>
    <ClusterNode :node="nodeState" :single="true"></ClusterNode>
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

<script lang="ts" setup>
import Button from "primevue/button";
import ClusterNode from "./ClusterNode.vue";
import {computed} from "vue";
import connection from "./lib/connection";

if (connection.state.nodesCount === 0) {
    connection.setNodesCount(1);
}
const node = connection.state.nodes[0];
const enableFetch = computed(() => node.canFetch())
const nodeState = node.state;
</script>

<style scoped>

</style>
