<template>
  <el-form
          :model="topology"
          ref="topologyForm"
          label-width="240px"
          @validate="checkField"
  >

    <el-divider content-position="right">Deployment topology</el-divider>

    <el-form-item label="Deployment topology:" prop="cluster">
      <el-switch
              v-model="cluster"
              active-text="Cluster"
              inactive-text="Single node">
      </el-switch>
    </el-form-item>

    <FormSwitch label="Separate interfaces:" prop="separateNetworks" v-model="topology.separateNetworks">
      Enable this option if internal and external communication should use different network interfaces.
    </FormSwitch>

    <ClusterNodes :is-cluster="topology.cluster" :show-int-ip="topology.separateNetworks" />

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
import topologyStore from "../store/topology";
import {error, ok, validateGossip} from "../lib/validate";
import validation from "../store/validation";
import ClusterNode from "./ClusterNode";
import ClusterNodes from "./ClusterNodes";

export default {
    name:       "Topology",
    components: {ClusterNodes, ClusterNode, Security, FormSwitch, Port},
    computed:   {
        topology: () => topologyStore.state,

        cluster:    topologyStore.extendedProperty("cluster", "updateClustering"),

        isTcpEnabled:       () => true,
        isDnsClusterGossip: () => topologyStore.isDnsGossip(),
        isSelfSigned:       () => true,
    },
    methods:    {
        async validateClusterGossip(rule, value, callback) {
            return !this.isDnsClusterGossip ? ok(callback) : await validateGossip(this.topology.nodes, value, callback);
        },
        checkField(field, result, error) {
            validation.record("Deployment topology", field, result, error);
        },
        validate() {
            console.log("validating!")
        },
    }
}
</script>
