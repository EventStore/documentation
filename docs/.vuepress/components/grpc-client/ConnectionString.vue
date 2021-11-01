<template>
  <div class="p-field p-grid" v-show="show">
    <divider align="right">Connection string</divider>
    <label for="connString" class="p-col-3 form-label">Connection string:</label>
    <div class="p-col">
      <div class="p-inputgroup">
        <InputText id="connString" v-model="connString" :disabled="true"/>
        <span class="p-inputgroup-addon" :class="spanClass">
          <i class="pi" :class="iconClass" @click="copy"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import InputText from "primevue/inputtext";
import Divider from "primevue/divider";
import {computed, ref} from "vue";
import {extendedToast} from "./lib/toastMessage";
import {useToast} from "primevue/usetoast";
import {addKeepAlive, connectionString} from "./lib/connectionString";
import {keepAlive} from "./lib/keepAlive";

const spanClass = ref({
    "p-inputgroup-addon-temp": false
});
const iconClass = ref({
    "pi-check": false,
    "pi-copy": true,
});

const msg = extendedToast(useToast());
const revertClass = () => {
    iconClass.value["pi-check"] = !iconClass.value["pi-check"];
    iconClass.value["pi-copy"] = !iconClass.value["pi-copy"];
    spanClass.value["p-inputgroup-addon-temp"] = !spanClass.value["p-inputgroup-addon-temp"];
}
const showCopy = ref(true);
const show = computed(() => connectionString.success && connectionString.result !== "");
const connString = computed(() => addKeepAlive(connectionString, keepAlive));
const copy = () => {
    navigator.clipboard.writeText(connectionString.result);
    revertClass();
    msg.success("Copied", "Connection string copied to clipboard");
    setTimeout(() => revertClass(), 3000);
};
</script>

<style scoped>
.p-inputgroup-addon-temp {
    background: var(--c-brand);
}
</style>
