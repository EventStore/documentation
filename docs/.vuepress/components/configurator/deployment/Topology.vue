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

    <ClusterNodes ref="clusterNodes" :is-cluster="topology.cluster" :show-int-ip="topology.separateNetworks"/>

    <Gossip ref="clusterGossip" :gossip="topology.gossip" :nodes="nodes"/>

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
import Security from "../security/Security";
import FormSwitch from "../form/FormSwitch";
import Port from "../shared/Port";
import ClusterNode from "./ClusterNode";
import ClusterNodes from "./ClusterNodes";
import Gossip from "../shared/Gossip";
import topologyStore from "../../../store/configurator/topology";
import nodes from "../../../store/configurator/nodes";
import validationMixin from "../shared/validationMixin";

export default {
    name:       "Topology",
    mixins:     [validationMixin],
    components: {ClusterNodes, ClusterNode, Security, FormSwitch, Port, Gossip},
    computed:   {
        topology:     () => topologyStore.state,
        nodes:        () => nodes.state.nodes,
        isTcpEnabled: () => topologyStore.state.tcpEnabled,

        cluster: topologyStore.extendedProperty("cluster", "updateClustering"),

        section: () => "Deployment topology"
    },
    methods:    {
        validate() {
            this.$refs.topologyForm.validate();
            this.$refs.clusterNodes.validate();
            this.$refs.clusterGossip.validate();
        },
    }
}
</script>
