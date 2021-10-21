<template>
  <div>
    <div class="p-field p-grid">
      <label for="clusterId" class="p-col-3">Cloud cluster ID:</label>
      <div class="p-col">
        <InputText id="clusterId" v-model="clusterId" placeholder="Enter the Event Store Cloud cluster ID"/>
      </div>
    </div>
    <div class="p-field p-grid">
      <div class="p-col-3">&nbsp;</div>
      <div class="p-col smaller">
        Find your cluster ID in the <a href="https://console.eventstore.cloud" target="_blank">Cloud Console</a>,
        on the Cluster Details tab.
      </div>
    </div>
    <div class="p-field p-grid">
      <div class="p-col-3">&nbsp;</div>
      <div class="p-col-fixed" style="width: 250px">
        <Button label="Fetch configuration" icon="pi pi-cloud-download" :disabled="!enableFetch" />
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

export default {
    name:       "Cloud",
    components: {InputText, Button},
    props:      {
        clusterId: String
    },
    setup(props) {
        const clusterId   = ref(props.clusterId ?? "");
        const enableFetch = computed(() => clusterId.value !== "");

        return {
            clusterId,
            enableFetch
        }
    }
}
</script>

<style scoped>
.smaller {
    font-size: 14px;
}
</style>
