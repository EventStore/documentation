<template>
  <ClientOnly>
    <div>
      <h2>EventStoreDB installation and configuration</h2>

      <el-divider content-position="right">Installation</el-divider>

      <Installation/>

      <el-divider content-position="right">Configuration</el-divider>

      <NodeConfig
              v-for="node in nodes"
              :key="`node-${node.index}`"
              :node="node"
              :projections="projections"
      />
    </div>
  </ClientOnly>
</template>

<script>
import NodeConfig from "./NodeConfig";
import Installation from "./Installation";
import nodes from "../../domain/nodes";

export default {
    name:       "Configuration",
    components: {NodeConfig, Installation},
    props:      {
        projections: Object
    },
    computed:   {
        nodes: () => nodes.nodes
    },
}
</script>

<style lang="scss">
.el-tabs__item {
  font-size: 16px;
}
</style>
