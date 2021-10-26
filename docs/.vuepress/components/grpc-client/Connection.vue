<template>
  <div class="form card">
    <toast position="bottom-right" group="br"/>
    <div class="p-fluid">
      <div class="p-field p-grid">
        <label for="fetch-from" class="p-col-3 form-label">Fetch configuration from:</label>
        <div class="p-col">
          <SelectButton id="fetch-from" :options="options" v-model="fetchFrom" optionLabel="name" dataKey="value"/>
        </div>
      </div>
      <cloud v-if="fetchFrom.value === FetchFrom.Cloud"></cloud>
      <node-url v-else-if="fetchFrom.value === FetchFrom.NodeUrl"></node-url>
      <manual v-else></manual>
      <keep-alive-form/>

      <ConnectionString/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue";
import KeepAliveForm from "./KeepAlive.vue";
import SelectButton from "primevue/selectbutton";
import Toast from "primevue/toast";
import Cloud from "./Cloud.vue";
import NodeUrl from "./NodeUrl.vue";
import Manual from "./Manual.vue";
import {FetchFrom} from "./lib/enums";
import ConnectionString from "./ConnectionString.vue";
import {connectionString} from "./lib/connectionString";
import store from "../xode/store";

const options = ref([
    {name: "Event Store Cloud", value: FetchFrom.Cloud},
    {name: "Node URL", value: FetchFrom.NodeUrl},
    {name: "Specify manually", value: FetchFrom.Manual},
]);
const fetchFrom = ref(options.value[0]);
watch(connectionString, () => store.updateConnectionString(connectionString.result));
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
