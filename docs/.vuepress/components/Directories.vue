<template>
    <el-form
        :model="directories"
        ref="directoriesForm"
        label-width="240px"
    >
      <el-divider content-position="right">Directories</el-divider>

      <FormInput
          label="Data:"
          prop="data"
          prompt="Data directory"
          :required="true"
          v-bind:value="directories.data"
          v-on:input="refresh($event)"
      />
      <FormInput
          label="Index:"
          prop="index"
          prompt="Index directory"
          :required="true"
          v-bind:value="directories.index"
          v-on:input="refresh($event)"
      />
      <FormInput
          label="Logs:"
          prop="logs"
          prompt="Logs directory"
          :required="true"
          v-bind:value="directories.logs"
          v-on:input="refresh($event)"
      />
      <FormInput
          label="Configuration:"
          prop="config"
          placeholder="Configuration directory"
          :required="true"
          :disabled="disableConfig"
          v-bind:value="directories.config"
          v-on:input="refresh($event)"
      />
    </el-form>
</template>

<script>
import FormInput from "./FormInput";

export default {
  name: "Directories",
  components: {FormInput},
  props: {
    directories: Object,
    prop: String,
    disableConfig: Boolean
  },
  methods: {
    refresh(e) {
      this.$emit("update", {value: e.value, prop: this.prop, field: e.prop});
    }
  }
}
</script>

<style scoped>

</style>
