<template>
  <divider align="right">KeepAlive pings</divider>
  <div class="p-field p-grid">
    <div class="p-col-3 form-label">Enable KeepAlive:</div>
    <div class="p-col-2">
      <InputSwitch v-model="enabled"/>
    </div>
    <div class="p-col">
      <small>
        KeepAlive settings are available for server and client versions 20.10+.
        Read more in <a href="/server/v20.10/networking/http.html#keepalive-pings" target="_blank">KeepAlive settings
        docs</a>
      </small>
    </div>
  </div>
  <div class="p-field p-grid">
    <label for="interval" class="p-col-3 form-label">KeepAlive interval (ms):</label>
    <div class="p-col-2">
      <InputNumber
              id="interval"
              v-model="keepAlive.state.interval"
              placeholder="10,000"
              :min="keepAlive.state.min"
              :max="keepAlive.state.max"
              :disabled="!enabled"
              @input="trackInterval"
      />
    </div>
    <div class="p-col-6"><small class="p-warning">{{ intervalHelp }}</small></div>
  </div>
  <div class="p-field p-grid">
    <label for="timeout" class="p-col-3 form-label">KeepAlive timeout (ms):</label>
    <div class="p-col-2">
      <InputNumber
              id="timeout"
              v-model="keepAlive.state.timeout"
              placeholder="10,000"
              :min="keepAlive.state.min"
              :max="keepAlive.state.max"
              :disabled="!enabled"
              @input="trackTimeout"
      />
    </div>
    <div class="p-col-6"><small class="p-warning">{{ timeoutHelp }}</small></div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from "vue";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import Divider from "primevue/divider";
import {keepAlive} from "./lib/keepAlive";

const intervalHelp = ref("");
const timeoutHelp = ref("");
const enabled = computed({get: () => keepAlive.state.enabled, set: v => keepAlive.enable(v)});

const setIntervalHelp = (v?: number) => intervalHelp.value = keepAlive.minKeepAliveIntervalValueHelp(v);
const setTimeoutHelp = (v?: number) => timeoutHelp.value = keepAlive.minKeepAliveTimeoutValueHelp(v);

watch(enabled, v => {
    setIntervalHelp();
    setTimeoutHelp();
    if (v) return;
    keepAlive.state.interval = undefined;
    keepAlive.state.timeout = undefined;
})

const trackInterval = v => setIntervalHelp(v.value);
const trackTimeout = v => setTimeoutHelp(v.value);
</script>
