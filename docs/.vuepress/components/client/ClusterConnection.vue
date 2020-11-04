<template>
<!--  <ClientOnly>-->
    <div>
      <transition name="slide">
        <div v-show="showGossip">
          <GossipConfig ref="clientGossip" :gossip="gossip"/>

          <Port
                  label="HTTP"
                  prop="gossipPort"
                  :enabled="enableHttpPort"
                  v-model="gossipPort"
          >
          </Port>

        </div>
      </transition>

      <transition name="slide">
        <el-form-item
                v-show="showNodesCount"
                label="Number of nodes:"
                prop="nodesCount"
        >
          <el-col :span="10">
            <el-input-number
                    v-model="nodesCount"
                    :min="minNodes"
                    :max="maxNodes"
                    :disabled="disableNodesCount"
            >
            </el-input-number>
          </el-col>
        </el-form-item>
      </transition>

      <transition-group name="slide">
        <NodeDetails
                v-show="showNodes"
                v-for="node in nodes"
                :key="`clientNode-${node.index}`"
                :node="node"
        />
      </transition-group>
    </div>
<!--  </ClientOnly>-->
</template>

<script>
import connection from "../../store/client/connection";
import GossipConfig from "../shared/Gossip";
import NodeDetails from "./NodeDetails";
import Port from "../configurator/shared/Port";

export default {
    name:       "ClusterConnection",
    components: {GossipConfig, NodeDetails, Port},
    computed:   {
        gossip:            () => connection.state.gossip,
        nodes:             () => connection.state.nodes,
        showGossip:        () => connection.state.cluster,
        showNodes:         () => !connection.state.cluster || !connection.state.gossip.isDnsGossip(),
        showNodesCount:    () => connection.state.cluster && !connection.state.gossip.isDnsGossip(),
        disableNodesCount: () => connection.state.cloud,
        enableHttpPort:    () => !connection.state.cloud,
        minNodes:          () => connection.state.minNodes,
        maxNodes:          () => connection.state.maxNodes,

        nodesCount: connection.extendedProperty("nodesCount", "setNodesCount"),
        gossipPort: connection.property("gossipPort"),
    }
}
</script>
