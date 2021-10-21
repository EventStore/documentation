<template>
  <div class="form card">
    <div class="p-fluid">
      <div class="p-field p-grid">
        <label for="fetch-from" class="p-col-3">Fetch configuration from:</label>
        <div class="p-col">
          <SelectButton id="fetch-from" :options="options" v-model="fetchFrom" optionLabel="name" dataKey="value"/>
        </div>
      </div>
      <cloud v-show="showClusterId"></cloud>
      <node-url v-show="showNodeUrl"></node-url>
      <manual v-show="showManual"></manual>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, ref, watch} from "vue";
import SelectButton from "primevue/selectbutton";
import Cloud from "./Cloud.vue";
import NodeUrl from "./NodeUrl.vue";
import Manual from "./Manual.vue";
import connection from "./lib/connection";

export default {
    name: "Connection",
    components: {Manual, SelectButton, Cloud, NodeUrl},
    setup() {
        const options = ref([
            {name: "Event Store Cloud", value: "cloud"},
            {name: "Node URL", value: "node"},
            {name: "Specify manually", value: "manual"},
        ]);
        const fetchFrom = ref(options.value[0]);
        watch(fetchFrom, v => connection.cloud = v.value === "cloud");

        const showClusterId = computed(() => fetchFrom.value.value === "cloud");
        const showNodeUrl = computed(() => fetchFrom.value.value === "node");
        const showManual = computed(() => fetchFrom.value.value === "manual");

        return {
            fetchFrom,
            options,
            showClusterId,
            showNodeUrl,
            showManual
        }
    }
}
</script>

<style lang="scss" scoped>
.form {
  .card {
    min-width: 450px;

    form {
      margin-top: 2rem;
    }

    .p-field {
      margin-bottom: 1.5rem;
    }
  }

  @media screen and (max-width: 960px) {
    .card {
      width: 80%;
    }
  }
}
</style>
