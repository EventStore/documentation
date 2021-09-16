<template>
  <el-form-item
      :label="label"
      :prop="prop"
      :rules="[ {required: required, message: `${prompt} is required`, trigger: 'blur'} ]"
  >
    <el-col :span="10">
      <el-input
          :placeholder="prompt"
          v-model="inputValue"   
          v-bind:value="value"
          v-on:input="updateValue($event)"       
          autocomplete="off"
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
    disabled: Boolean,
    modelValue: String 
  },
  emits: ['update:modelValue'],
  computed: {
    inputValue: {
      // getter
      get() {
        return this.modelValue;
      },
      // setter
      set(val) {
        this.$emit("input", val);
        this.$emit('update:modelValue', val);
      }
    }
  }
}
</script>

<style scoped>

</style>
