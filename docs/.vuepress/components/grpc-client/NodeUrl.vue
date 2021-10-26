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
                @click="fetch"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "primevue/button";
import ClusterNode from "./ClusterNode.vue";
import {computed} from "vue";
import {getEmptyNode} from "./lib/clientNode";
import {connectionString, copyFrom, fromNodeUrl} from "./lib/connectionString";
import {extendedToast} from "./lib/toastMessage";
import {useToast} from "primevue/usetoast";
import {keepAlive} from "./lib/keepAlive";

const msg = extendedToast(useToast());
const node = getEmptyNode();
const enableFetch = computed(() => node.canFetch())
const nodeState = node.state;
const fetch = async () => {
    const connString = await fromNodeUrl(node, keepAlive);
    if (!connString.success) {
        msg.error("Unable to get configuration", connString.err);
    } else {
        msg.success("Configuration resolved", "Connection string generated");
    }
    // error.value = connString.err;
    copyFrom(connString, connectionString);
}
</script>
