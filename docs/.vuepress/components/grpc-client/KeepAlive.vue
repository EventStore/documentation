<template>
  <divider align="right">KeepAlive pings</divider>
  <div class="p-field p-grid">
    <div class="p-col-3">
      Enable KeepAlive:
    </div>
    <div class="p-col-2">
      <InputSwitch v-model="enabled"/>
    </div>
    <div class="p-col">
      <small>
        Read more in <a href="/server/v20.10/networking/http.html#keepalive-pings" target="_blank">KeepAlive settings
        docs</a>
      </small>
    </div>
  </div>
  <div class="p-field p-grid">
    <label for="interval" class="p-col-3">KeepAlive interval (ms):</label>
    <div class="p-col-2">
      <InputNumber
              id="interval"
              v-model="keepAlive.interval"
              placeholder="10,000"
              :min="keepAlive.min"
              :max="keepAlive.max"
              :disabled="!enabled"
              @input="trackInterval"
      />
    </div>
    <div class="p-col-6"><small class="p-warning">{{ intervalHelp }}</small></div>
  </div>
  <div class="p-field p-grid">
    <label for="timeout" class="p-col-3">KeepAlive timeout (ms):</label>
    <div class="p-col-2">
      <InputNumber
              id="timeout"
              v-model="keepAlive.timeout"
              placeholder="10,000"
              :min="keepAlive.min"
              :max="keepAlive.max"
              :disabled="!enabled"
              @input="trackTimeout"
      />
    </div>
    <div class="p-col-6"><small class="p-warning">{{ timeoutHelp }}</small></div>
  </div>
</template>

<script lang="ts" setup>
import connection from "./lib/connection";
import {ref, watch} from "vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import Divider from "primevue/divider";
import {minKeepAliveIntervalValueHelp, minKeepAliveTimeoutValueHelp} from "./lib/keepAlive";

const keepAlive = connection.keepAlive;
const enabled = ref(keepAlive.enabled);
const intervalHelp = ref("");
const timeoutHelp = ref("");

const setIntervalHelp = (e, v) => intervalHelp.value = minKeepAliveIntervalValueHelp(e, v);
const setTimeoutHelp = (e, v) => timeoutHelp.value = minKeepAliveTimeoutValueHelp(e, v);

watch(enabled, v => {
    setIntervalHelp(v, keepAlive.interval);
    setTimeoutHelp(v, keepAlive.timeout);
    if (v) return;
    keepAlive.interval = undefined;
    keepAlive.timeout = undefined;
})

const trackInterval = v => setIntervalHelp(enabled.value, v.value);
const trackTimeout = v => setTimeoutHelp(enabled.value, v.value);
</script>
