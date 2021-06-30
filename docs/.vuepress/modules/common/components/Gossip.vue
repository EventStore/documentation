<template>
  <transition name="slide">
    <el-form
            :model="gossip"
            ref="gossipForm"
            label-width="240px"
            v-show="showGossip"
            @validate="checkField"
    >
      <el-form-item :label="methodLabel" prop="method">
        <el-col :span="10">
          <el-radio-group
                  v-model="gossip.method"
                  :disabled="gossip.disableGossipMethod"
                  @change="validate"
          >
            <el-radio-button label="dns">Cluster DNS</el-radio-button>
            <el-radio-button label="seed">Nodes seed</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="12" class="form-help">
        </el-col>
      </el-form-item>

      <transition name="slide">
        <el-form-item
                :label="label"
                prop="dnsName"
                v-show="isDnsGossip"
                :rules="[
              {required: isDnsGossip, message: 'Gossip DNS name required', trigger: 'blur'},
              {validator: validateGossip, trigger: 'blur'}
            ]"
        >
          <el-col :span="10">
            <el-input
                    placeholder="Cluster DNS name"
                    v-model="gossip.dnsName"
            >
            </el-input>
          </el-col>
        </el-form-item>
      </transition>
    </el-form>
  </transition>
</template>

<script>
import validationMixin from "../validationMixin";

export default {
    name:     "Gossip",
    mixins:   [validationMixin],
    props:    {
        gossip: Object,
        nodes:  Array
    },
    computed: {
        isDnsGossip() {
            return this.gossip.isDnsGossip();
        },
        showGossip() {
            return this.gossip.showGossip;
        },
        label() {
            return this.gossip.type + " gossip DNS name:";
        },
        methodLabel() {
            return `Gossip for ${this.gossip.message}:`;
        },
        section() {
            switch (this.gossip.type) {
                case "Cluster":
                    return "Deployment topology";
                case "Client":
                    return "Client connection";
            }
            return null;
        }
    },
    methods:  {
        async validateGossip(rule, value, callback) {
            if (!this.nodes) return;

            await this.gossip.validateGossip(this.nodes, value, callback);
        },
        async validate() {
            try {
                await this.$refs.gossipForm.validate();
            } catch {
            }
        }
    }
}
</script>

