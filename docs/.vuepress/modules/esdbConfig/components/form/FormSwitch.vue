<template>
  <el-form-item
      :label="label"
      :prop="prop"
  >
    <el-col :span="4">
      <el-switch
          v-bind:value="value"
          v-on:input="updateValue($event)"
          :disabled="disabled"
      />
    </el-col>
    <el-col :span="12" class="form-help">
      <slot></slot>
    </el-col>
  </el-form-item>
</template>

<script>
export default {
  name: "FormSwitch",
  props: {
    label: String,
    prop: String,
    value: Boolean,
    disabled: Boolean
  },
  methods: {
    updateValue(val) {
      this.$emit("input", val);
    }
  }
}
</script>

<style scoped>

</style>
