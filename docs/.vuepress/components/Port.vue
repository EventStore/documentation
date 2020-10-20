<template>
  <el-form-item
      :label="label + ' port:'"
      :prop="prop"
      :rules="portRules(enabled)"
  >
    <el-col :span="4">
      <el-input v-bind:value="value" v-on:input="updateValue($event)"/>
    </el-col>
    <el-col :span="6">&nbsp;</el-col>
    <el-col :span="12" class="form-help">
      <slot></slot>
    </el-col>
  </el-form-item>

</template>

<script>
export default {
  name: "Port",
  props: {
    label: String,
    prop: String,
    value: [String, Number],
    enabled: Boolean
  },
  watch: {
  },
  methods: {
    portRules(required) {
      return [
        {required: required, message: `${this.label} port is required`},
        {validator: this.validate}
      ]
    },
    updateValue(val) {
      this.$emit("input", val);
    },
    validate(rule, value, callback) {
      if (isNaN(value)){
        callback(new Error(`${this.label} must be a number`));
      }
      callback();
    }
  }
}
</script>

<style scoped>

</style>
