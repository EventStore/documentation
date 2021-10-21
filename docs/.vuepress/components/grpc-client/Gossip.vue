<template>
  <div>
    <divider align="right">Gossip</divider>
    <div class="p-field p-grid">
      <label for="method" class="p-col-3">Gossip method:</label>
      <div class="p-col">
        <SelectButton id="method" :options="options" v-model="gossipMethod" optionLabel="name" dataKey="value"/>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from "vue";
import SelectButton from "primevue/selectbutton";
import Divider from "primevue/divider";
import {DnsGossip, SeedGossip} from "./lib/gossip";
import connection from "./lib/connection";

export default {
    name:       "Gossip",
    components: {SelectButton, Divider},
    setup() {
        const options = ref([
            {name: "Cluster DNS name", value: DnsGossip},
            {name: "Gossip seed", value: SeedGossip}
        ]);
        const gossip = connection.gossip;
        const gossipMethod = computed({
            get: () => options.value.find(x => x.value === gossip.method),
            set: v => gossip.method = v.value
        });

        return {
            fetchFrom: ref(""),
            options,
            gossip,
            gossipMethod
        }
    }
}
</script>

<style scoped>

</style>
