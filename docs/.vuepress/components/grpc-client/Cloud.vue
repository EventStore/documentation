<template>
  <div>
    <Toast position="bottom-right" group="br"/>
    <Toast />
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
import {computed, defineProps, ref} from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import connection from "./lib/connection";
import {useToast} from "primevue/usetoast";

const msg = useToast();
const showToast = (severity: string, summary: string, detail: string) => {
    msg.add({severity, summary, detail, group: 'br', life: 3000});
}
const clusterId = computed<string>({
    get: () => connection.state.clusterId,
    set: v => connection.state.clusterId = v
});
const enableFetch = computed(() => clusterId.value !== "");
const error = ref<string | undefined>(undefined);
const fetch = async () => {
    const connString = await connection.getCloudConnectionString();
    if (!connString.success) {
        showToast("error", "Unable to get configuration", connString.err);
    } else {
        showToast("success", "Configuration resolved", "Connection string generated for cloud cluster");
    }
    error.value = connString.err;
}
</script>
