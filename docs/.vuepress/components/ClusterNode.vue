<template>
  <el-form
          label-width="240px"
          :ref="`node-${nodeIndex}`"
          :model="node"
          :inline="true"
          @validate="checkNodeField"
  >
    <el-form-item
            prop="dnsName"
            :label="`Node ${nodeIndex} address:`"
            :rules="[ { validator: validateClusterNodeDns, trigger: 'blur'} ]"
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
                  { validator: validateNodeIp, trigger: 'blur'}
                ]"
    >
      <el-input
              placeholder="External IP"
              v-model="node.extIp"
              autocomplete="false"
              clearable>
      </el-input>
    </el-form-item>

    <transition name="el-zoom-in-center">
      <el-form-item
              prop="intIp"
              v-show="showIntIp"
              :rules="[ { validator: validateNodeIp, required: showIntIp, trigger: 'blur'} ]"
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
import nodesStore from "../store/nodes";
import {error, ok} from "../lib/validate";
import validation from "../store/validation";
import * as networks from "../lib/networks";

export default {
    name:     "ClusterNode",
    props:    {
        nodeIndex: Number,
        showIntIp: Boolean
    },
    computed: {
        node() {return nodesStore.getNode(this.nodeIndex);},
    },
    methods:  {
        validateNodeIp(rule, value, callback) {
        },
        async resolveNodeDns() {
            await this.node.resolveDnsName();
        },
        checkNodeField(field, result, error) {
            validation.record(`Node ${this.nodeIndex}`, field, result, error);
        },
        validateNodeDns(rule, value, property, callback) {
            const checkDns = () => {
                const err = nodesStore.validateNodeDns(property, value);
                return err == null || error(callback, err);
            }

            const result = value === ""
                ? ok(callback)
                : checkDns();

            // if (result) {
            //     if (this.topology.gossip !== "" && this.isDnsClusterGossip) {
            //         this.$refs.topologyForm.validateField("gossip");
            //     }
            //     if (this.client.gossip !== "" && this.isDnsClientGossip) {
            //         this.$refs.clientForm.validateField("gossip");
            //     }
            //     ok(callback);
            // }
        },
        validateClusterNodeDns(rule, value, callback) {
            this.validateNodeDns(rule, value, "dnsName", callback);
        },
    }
}
</script>
