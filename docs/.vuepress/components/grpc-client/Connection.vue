<template>
  <div class="form card">
    <div class="p-fluid">
      <div class="p-field p-grid">
        <label for="fetch-from" class="p-col-3">Fetch configuration from:</label>
        <div class="p-col">
          <SelectButton id="fetch-from" :options="options" v-model="fetchFrom" optionLabel="name" dataKey="value"/>
        </div>
      </div>
      <cloud :cluster-id="clusterId" v-if="connection.isHosting(FetchFrom.Cloud)"></cloud>
      <node-url v-else-if="connection.isHosting(FetchFrom.NodeUrl)"></node-url>
      <manual v-else></manual>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from "vue";
import SelectButton from "primevue/selectbutton";
import Cloud from "./Cloud.vue";
import NodeUrl from "./NodeUrl.vue";
import Manual from "./Manual.vue";
import connection from "./lib/connection";
import {FetchFrom} from "./lib/enums";

const options = ref([
    {name: "Event Store Cloud", value: FetchFrom.Cloud},
    {name: "Node URL", value: FetchFrom.NodeUrl},
    {name: "Specify manually", value: FetchFrom.Manual},
]);
const fetchFrom = ref(options.value[0]);
watch(fetchFrom, v => connection.changeHosting(v.value));
const clusterId = undefined;
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
