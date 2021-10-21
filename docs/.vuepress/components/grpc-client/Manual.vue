<template>
  <div>
    <div class="p-field p-grid">
      <div class="p-col-3">
        Topology:
      </div>
      <div class="p-col">
        <ToggleButton
                v-model="connection.cluster"
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
                v-model="connection.secure"
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

<script>
import ToggleButton from "primevue/togglebutton";
import KeepAliveForm from "./KeepAlive.vue";
import Gossip from "./Gossip.vue";
import connection from "./lib/connection";
import {computed, watch} from "vue";

export default {
    name:       "Manual",
    components: {ToggleButton, KeepAliveForm, Gossip},
    setup() {
        const conn = connection.state;
        const keepAlive = connection.keepAlive;

        const showKeepAlive = computed(() => keepAlive.enabled);
        const showGossip = computed(() => conn.cluster);

        return {
            connection: conn,
            keepAlive,
            showKeepAlive,
            showGossip
        };
    }
}
</script>

<style scoped>

</style>
