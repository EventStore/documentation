<template>
  <el-form
          label-width="240px"
          ref="clusterNode"
          :model="node"
          :inline="true"
          @validate="(field, result, error) => checkNodeField(nodeIndex, field, result, error)"
  >
    <el-form-item
            prop="dnsName"
            :label="`Node ${nodeIndex} address:`"
            :rules="[ { validator: validateNodeDns, trigger: 'blur'} ]"
    >
      <el-input
              placeholder="DNS name (optional)"
              v-model="node.dnsName"
              @change="resolveNodeDns()"
              autocomplete="false"
              clearable>
      </el-input>
    </el-form-item>

    <el-form-item
            prop="extIp"
            :rules="[
                  {required: true, message: 'Node IP address is required'},
                  {validator: validateNodeIp, trigger: 'blur'}
                ]"
    >
      <el-input
              placeholder="External IP"
              v-model="node.extIp"
              autocomplete="false"
              clearable>
      </el-input>
    </el-form-item>

    <transition name="el-zoom-in-center">,
      <el-form-item
              prop="intIp"
              v-show="showIntIp"
              :rules="[
                  {required: showIntIp, message: 'Node IP address is required'},
                  {validator: validateNodeIp, trigger: 'blur'}
                  ]"
      >
        <el-input
                placeholder="Internal IP"
                v-model="node.intIp"
                autocomplete="false"
                clearable>
        </el-input>
      </el-form-item>
    </transition>
  </el-form>

</template>

<script>
import nodesStore from "../../store/nodes";
import nodeMixin from "../shared/nodeMixin";

export default {
    name:     "ClusterNode",
    mixins:   [nodeMixin],
    props:    {
        nodeIndex: Number,
        showIntIp: Boolean
    },
    watch:    {
        showIntIp(v) {
            if (v) return;
            setTimeout(_ => this.revalidate("node", "intIp"), 100);
        }
    },
    computed: {
        node() {
            return nodesStore.getNode(this.nodeIndex);
        },
    },
    methods:  {
        ignore(field) {
            return !this.showIntIp && field === "intIp";
        },
        async validate() {
            try {
                await this.$refs.clusterNode.validate();
            } catch {
            }
        }
    }
}
</script>
