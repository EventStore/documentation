<template>
  <div class="p-field p-grid" v-show="show">
    <label for="connString" class="p-col-3 form-label">Connection string:</label>
    <div class="p-col">
      <InputText id="connString" v-model="connString" :disabled="true"/>
    </div>
  </div>

</template>

<script lang="ts" setup>
import InputText from "primevue/inputtext";
import {computed} from "vue";
import connection from "./lib/connection";

const connString = computed(() => connection.connectionString.value);
const show = computed(() => connString.value !== undefined && connString.value !== "");
</script>
