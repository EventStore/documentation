<template>
  <div v-show="advertiseToClient">
    <transition-group name="slide" mode="in-out">
      <el-form
              label-width="240px"
              v-for="item in nodes"
              :key="`clientNode-${item.index}`"
              :ref="`clientNode-${item.index}`"
              :model="item"
              :inline="true"
              @validate="(field, result, error) => checkNodeField(item.index, field, result, error)"
      >
        <el-form-item
                prop="clientDnsName"
                :label="`Node ${item.index} translated address:`"
                :rules="[
                    { required: advertiseToClient, trigger: 'blur', message: 'Translated address is required'},
                    { validator: validateNodeDns, required: advertiseToClient, trigger: 'blur'}
                    ]"
        >
          <el-input
                  placeholder="DNS name"
                  v-model="item.clientDnsName"
                  autocomplete="false"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </transition-group>

  </div>
</template>

<script>
import nodeMixin from "../shared/nodeMixin";

export default {
    name:    "ClientNodes",
    mixins:  [nodeMixin],
    props:   {
        nodes:             Array,
        advertiseToClient: Boolean
    },
    watch:   {
        advertiseToClient(v) {
            if (v) return;
            setTimeout(_ => this.revalidate("clientNode", "clientDnsName"), 100);
        }
    },
    methods: {
        ignore(field) {
            return !this.advertiseToClient || field !== "clientDnsName";
        },
        validate() {
            this.nodes.forEach(async node => {
                try {
                    await this.$refs[`clientNode-${node.index}`][0].validate();
                } catch {}
            });
        }
    }
}
</script>
