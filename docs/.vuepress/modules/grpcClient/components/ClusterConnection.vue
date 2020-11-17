<template>
  <ClientOnly>
    <div>
      <transition name="slide" mode="out-in">
        <div v-show="gossip.showGossip">
          <GossipConfig ref="clientGossip" :gossip="gossip"/>

          <transition name="slide" mode="out-in">
            <Port
                    label="HTTP"
                    prop="gossipPort"
                    :enabled="enableHttpPort"
                    v-model="gossipPort"
                    v-show="!showNodes"
            >
            </Port>
          </transition>

        </div>
      </transition>

      <transition name="slide" mode="out-in">
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

      <transition-group name="slide" mode="out-in">
        <NodeDetails
                v-show="showNodes"
                :single="!cluster"
                v-for="node in nodes"
                :key="`clientNode-${node.index}`"
                :node="node"
        />
      </transition-group>
    </div>
  </ClientOnly>
</template>

<script>
import connection from "../domain/connection";
import GossipConfig from "../../common/components/Gossip";
import NodeDetails from "./NodeDetails";
import Port from "../../esdbConfig/components/shared/Port";

export default {
    name:       "ClusterConnection",
    components: {GossipConfig, NodeDetails, Port},
    computed:   {
        gossip:            () => connection.gossip,
        nodes:             () => connection.nodes,
        cluster:           () => connection.cluster,
        showNodes:         () => !connection.cluster || !connection.isDnsGossip(),
        showNodesCount:    () => connection.cluster && !connection.isDnsGossip(),
        disableNodesCount: () => connection.cloud,
        enableHttpPort:    () => !connection.cloud && connection.isDnsGossip(),
        minNodes:          () => connection.minNodes,
        maxNodes:          () => connection.maxNodes,

        nodesCount: connection.extendedProperty("nodesCount", "setNodesCount"),
        gossipPort: connection.property("gossipPort"),
    }
}
</script>
