<template>
  <div>
    <divider align="right">Gossip</divider>
    <div class="p-field p-grid">
      <label for="method" class="p-col-3 form-label">Gossip method:</label>
      <div class="p-col">
        <SelectButton id="method" :options="options" v-model="gossipMethod" optionLabel="name" dataKey="value"/>
      </div>
    </div>

    <div v-if="showGossipDns">
      <div class="p-field p-grid">
        <label for="gossipDns" class="p-col-3 form-label">Cluster DNS name:</label>
        <div class="p-col">
          <InputText id="gossipDns" v-model="gossip.dnsName" placeholder="Enter the cluster DNS name"/>
        </div>
      </div>
      <div class="p-field p-grid">
        <label for="gossipPort" class="p-col-3 form-label">Cluster HTTP port:</label>
        <div class="p-col-2">
          <InputNumber id="gossipPort" v-model="gossipPort" :useGrouping="false"/>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="p-field p-grid">
        <label for="nodesCount" class="p-col-3 form-label">Number of cluster nodes:</label>
        <div class="p-col-2">
          <InputNumber
                  id="nodesCount"
                  v-model="nodesCount"
                  :useGrouping="false"
                  :min="minNodes"
                  :max="maxNodes"
                  show-buttons
          />
        </div>
      </div>
      <div>&nbsp;</div>
      <cluster-node v-for="node in nodes" :node="node.state" :single="false"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import SelectButton from "primevue/selectbutton";
import Divider from "primevue/divider";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import connection from "./lib/connection";
import ClusterNode from "./ClusterNode.vue";
import {GossipMethod} from "./lib/enums";

const options = ref([
    {name: "Cluster DNS name", value: GossipMethod.Dns},
    {name: "Gossip seed", value: GossipMethod.Seed}
]);
const gossip = connection.gossip;
const gossipMethod = computed({
    get: () => options.value.find(x => x.value === gossip.method),
    set: v => gossip.method = v.value
});
const showGossipDns = computed(() => gossip.method === GossipMethod.Dns);
const nodesCount = computed({
    get: () => connection.state.nodesCount,
    set: v => connection.setNodesCount(v)
});
const gossipPort = connection.state.gossipPort;
const nodes = connection.state.nodes;
const minNodes = connection.state.minNodes;
const maxNodes = connection.state.maxNodes;
</script>
