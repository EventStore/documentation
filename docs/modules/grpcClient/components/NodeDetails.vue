<template>
  <ClientOnly>
    <el-form
            label-width="240px"
            :model="node"
    >
      <el-form-item :label="`Node ${single ? '' : `${node.index} `}address`" required>
        <el-col :span="10">
          <el-form-item
                  prop="address"
                  :rules="[ { validator: validateAddress, required: true, trigger: 'blur'} ]"
          >
            <el-input
                    :placeholder="placeholder ? placeholder : 'Server address'"
                    v-model="node.address"
                    style="width: 100%;"
            />
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">:</el-col>
        <el-col :span="4">
          <el-form-item
                  prop="port"
                  :rules="[{required: true, trigger: 'blur', message: 'HTTP port required'}]"
          >
            <el-input-number
                    placeholder="HTTP port"
                    :controls="false"
                    v-model="node.port"
                    style="width: 100%;"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
  </ClientOnly>
</template>

<script>
import {validateItem} from "../../../.vuepress/lib/validate";

export default {
    name:    "NodeDetails",
    props:   {
        node: Object,
        single: Boolean,
        placeholder: String
    },
    methods: {
        validateAddress(rule, value, callback) {
            validateItem(this.node.validateAddress(value), callback);
        }
    }
}
</script>

<style scoped>
.line {
    text-align: center;
}
</style>
