<template>
  <el-form
          :model="topology"
          ref="topologyForm"
          label-width="240px"
  >
    <!--    @validate="(field, result, error) => checkField('Cluster topology', field, result, error)"-->

    <el-divider content-position="right">Deployment topology</el-divider>

    <el-form-item label="Deployment topology:" prop="cluster">
      <el-switch
              v-model="cluster"
              active-text="Cluster"
              inactive-text="Single node">
      </el-switch>
    </el-form-item>

    <el-form-item label="Number of nodes:" prop="nodesCount">
      <el-col :span="10">
        <el-input-number
                v-model="nodesCount"
                :min="topology.minNodes"
                :max="topology.maxNodes"
        >
        </el-input-number>
      </el-col>
      <el-col :span="12" v-if="topology.cluster" class="form-help">
        We recommend <b>three nodes</b> for an HA cluster. The number of nodes should be odd.
      </el-col>
    </el-form-item>

    <FormSwitch label="Separate interfaces:" prop="separateNetworks" v-model="topology.separateNetworks">
      Enable this option if internal and external communication should use different network interfaces.
    </FormSwitch>

    <transition-group name="slide">
      <el-form
              label-width="240px"
              v-for="item in topology.nodes"
              :key="`node-${item.index}`"
              :ref="`node-${item.index}`"
              :model="item"
              :inline="true"
      >
        <!--        @validate="(field, result, error) => checkField('Node ' + item.index, field, result, error)"-->
        <el-form-item
                prop="dnsName"
                :label="`Node ${item.index} address:`"
                :rules="[ { validator: validateClusterNodeDns, trigger: 'blur'} ]"
        >
          <el-input
                  placeholder="DNS name (optional)"
                  v-model="item.dnsName"
                  @change="resolveNodeDns(item, 'dnsName', 'extIp')"
                  autocomplete="false"
                  clearable>
          </el-input>
        </el-form-item>

        <el-form-item
                prop="extIp"
                :rules="[
                  {required: true, message: 'Node IP address is required'},
                  { validator: validateNodeIp, trigger: 'blur'}
                ]"
        >
          <el-input
                  placeholder="External IP"
                  v-model="item.extIp"
                  autocomplete="false"
                  clearable>
          </el-input>
        </el-form-item>

        <transition name="el-zoom-in-center">
          <el-form-item
                  prop="intIp"
                  v-show="topology.separateNetworks"
                  :rules="[ { validator: validateNodeIp, required: topology.separateNetworks, trigger: 'blur'} ]"
          >
            <el-input
                    placeholder="Internal IP"
                    v-model="item.intIp"
                    autocomplete="false"
                    clearable>
            </el-input>
          </el-form-item>
        </transition>
      </el-form>
    </transition-group>

    <transition name="slide" mode="out-in">
      <div v-show="topology.cluster">
        <el-form-item label="Gossip for cluster nodes:" prop="gossipMethod">
          <el-col :span="10">
            <el-radio-group
                    v-model="topology.gossipMethod"
                    :disabled="topology.secure && !isSelfSigned"
            >
              <el-radio-button label="dns">Cluster DNS</el-radio-button>
              <el-radio-button label="seed">Nodes seed</el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="12" v-if="topology.cluster && topology.secure && !isSelfSigned" class="form-help">
            When nodes use wildcard certificate, cluster gossip can only use the nodes seed.
          </el-col>
        </el-form-item>

        <transition name="slide" mode="out-in">
          <el-form-item
                  label="Cluster gossip DNS:"
                  prop="gossip"
                  v-show="isDnsClusterGossip"
                  :rules="[
              {required: isDnsClusterGossip, message: 'Cluster DNS name required', trigger: 'blur'},
              {validator: validateClusterGossip, trigger: 'blur'}
            ]"
          >
            <el-col :span="10">
              <el-input
                      placeholder="Cluster DNS name"
                      v-model="topology.gossip"
                      clearable>
              </el-input>
            </el-col>
          </el-form-item>
        </transition>
      </div>
    </transition>

    <Port
            label="HTTP"
            prop="httpPort"
            :enabled="true"
            v-model="topology.httpPort"
    >
      HTTP port for internal and external communication over gRPC and
      endpoints like stats and gossip.
    </Port>
    <Port
            label="Internal TCP"
            prop="internalTcpPort"
            :enabled="topology.cluster"
            v-model="topology.internalTcpPort"
    >
      Even when TCP is disabled, cluster nodes still perform replication over TCP internally.
    </Port>
    <Port
            label="External TCP"
            prop="externalTcpPort"
            :enabled="isTcpEnabled"
            v-model="topology.externalTcpPort"
    >
      This port is used for TCP clients. You only need it if you have application using legacy TCP clients.
    </Port>

  </el-form>

</template>

<script>
import Security from "./Security";
import FormSwitch from "./FormSwitch";
import Port from "./Port";
import store from "../store/topology";
import * as networks from "../lib/networks";
import {ok, validateGossip} from "../lib/validate";

export default {
    name:       "Topology",
    components: {Security, FormSwitch, Port},
    computed:   {
        topology: () => store.state,

        cluster: {
            get: () => store.state.cluster,
            set: v => store.updateClustering(v)
        },
        nodesCount: {
            get: () => store.state.nodesCount,
            set: v => store.updateNodes(v)
        },

        isTcpEnabled:       () => true,
        isDnsClusterGossip: () => store.isDnsGossip(),
        isSelfSigned:       () => true,
    },
    methods:    {
        validateClusterNodeDns(rule, value, callback) {
            // this.validateNodeDns(rule, value, "dnsName", callback);
        },
        async validateClusterGossip(rule, value, callback) {
            return !this.isDnsClusterGossip ? ok(callback) : await validateGossip(this.topology.nodes, value, callback);
        },
        validateNodeIp(rule, value, callback) {
        },
        async resolveNodeDns(item, propFrom, propTo) {
            const ips = await networks.resolveDns(item[propFrom]);
            // item[propTo] = ips === undefined ? "" : ips[0];
        },
    }
}
</script>
