<template>
  <div>
    <div class="p-field p-grid">
      <div class="p-col-3">
        Topology:
      </div>
      <div class="p-col">
        <ToggleButton
                v-model="cluster"
                onLabel="Multi-node cluster"
                offLabel="Single-node instance"
                onIcon="pi pi-tags"
                offIcon="pi pi-tag"
                style="width: 15em"
        />
      </div>
    </div>
    <div class="p-field p-grid">
      <div class="p-col-3">
        Security:
      </div>
      <div class="p-col">
        <ToggleButton
                v-model="secure"
                onLabel="Secure"
                offLabel="Insecure"
                onIcon="pi pi-lock"
                offIcon="pi pi-lock-open"
                style="width: 15em"
        />
      </div>
    </div>
    <keep-alive-form/>
    <gossip v-if="showGossip"/>
  </div>
</template>

<script lang="ts" setup>
import ToggleButton from "primevue/togglebutton";
import KeepAliveForm from "./KeepAlive.vue";
import Gossip from "./Gossip.vue";
import conn from "./lib/connection";
import {computed, watch} from "vue";

const showGossip = computed(() => conn.state.cluster);
const cluster = computed({
    get: () => conn.state.cluster,
    set: v => conn.changeTopology(v)
});
const secure = computed({
    get: () => conn.state.secure,
    set: v => conn.changeSecurity(v)
});
</script>
