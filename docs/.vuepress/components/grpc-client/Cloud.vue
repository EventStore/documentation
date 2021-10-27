<template>
  <div>
    <div class="p-field p-grid">
      <label for="clusterId" class="p-col-3 form-label">Cloud cluster ID:</label>
      <div class="p-col">
        <InputText id="clusterId" v-model="clusterId" placeholder="Enter the Event Store Cloud cluster ID"/>
        <div v-show="error">
          <br/>
          <small class="p-error">{{ error }}</small>
        </div>
      </div>
    </div>
    <div class="p-field p-grid">
      <div class="p-col-3">&nbsp;</div>
      <div class="p-col">
        <small>
          Find your cluster ID in the <a href="https://console.eventstore.cloud" target="_blank">Cloud Console</a>,
          on the Cluster Details tab.
        </small>
      </div>
    </div>
    <div class="p-field p-grid">
      <div class="p-col-3">&nbsp;</div>
      <div class="p-col-fixed" style="width: 250px">
        <Button label="Fetch configuration" icon="pi pi-cloud-download" :disabled="!enableFetch" @click="fetch"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, defineProps} from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import {extendedToast} from "./lib/toastMessage";
import {useToast} from "primevue/usetoast";
import {fromCloudClusterId, connectionString, copyFrom} from "./lib/connectionString";

const props = defineProps<{clusterId: string}>();
const clusterId = ref(props.clusterId);
const enableFetch = computed(() => clusterId.value !== "");
const error = ref<string | undefined>(undefined);
const msg = extendedToast(useToast());
const fetch = async () => {
    const connString = await fromCloudClusterId(clusterId.value);
    if (!connString.success) {
        msg.error("Unable to get configuration", connString.err);
    } else {
        msg.success("Configuration resolved", "Connection string generated for cloud cluster");
    }
    error.value = connString.err;
    copyFrom(connString, connectionString);
}
if (clusterId.value !== "") {
    fetch();
}
</script>
