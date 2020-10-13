<template>
  <RadioGroup v-model="radio" v-on:change="change">
    <RadioButton label="single">Single node</RadioButton>
    <RadioButton label="cluster">Highly-available cluster</RadioButton>
  </RadioGroup>
</template>

<script>
import {RadioGroup, RadioButton} from "element-ui";

export default {
  name: "Topology",
  components: {
    RadioGroup,
    RadioButton
  },
  props: {
    topology: String
  },
  data() {
    return {
      radio: this.topology
    }
  },
  methods: {
    change() {
      this.$emit("change", this.radio);
    }
  }
}
</script>
