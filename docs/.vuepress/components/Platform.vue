<template>
  <RadioGroup v-model="radio" v-on:change="change">
    <RadioButton label="linux">Linux</RadioButton>
    <RadioButton label="windows">Windows</RadioButton>
  </RadioGroup>
</template>

<script>
import {RadioGroup, RadioButton} from "element-ui";

export default {
  name: "Platform",
  components: {
    RadioGroup,
    RadioButton
  },
  props: {
    platform: String
  },
  data() {
    return {
      radio: this.platform
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
