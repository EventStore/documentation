<template>
  <RadioGroup v-model="radio" v-on:change="change">
    <RadioButton label="true">Secure</RadioButton>
    <RadioButton label="false">Insecure</RadioButton>
  </RadioGroup>
</template>

<script>
import {RadioGroup, RadioButton} from "element-ui";

export default {
  name: "Security",
  components: {
    RadioGroup,
    RadioButton
  },
  props: {
    secure: String
  },
  data() {
    return {
      radio: this.secure
    }
  },
  methods: {
    change() {
      this.$emit("change", this.radio);
    }
  }
}
</script>

<style scoped>
</style>
