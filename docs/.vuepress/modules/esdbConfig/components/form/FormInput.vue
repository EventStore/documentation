<template>
  <el-form-item
      :label="label"
      :prop="prop"
      :rules="[ {required: required, message: `${prompt} is required`, trigger: 'blur'} ]"
  >
    <el-col :span="10">
      <el-input
          :placeholder="prompt"
          v-bind:value="value"
          v-on:input="updateValue($event)"
          autocomplete="false"
          :disabled="disabled"
          clearable>
      </el-input>
    </el-col>
  </el-form-item>

</template>

<script>
export default {
  name: "FormInput",
  props: {
    label: String,
    required: Boolean,
    prompt: String,
    prop: String,
    value: String,
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
