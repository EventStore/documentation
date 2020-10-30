<template>
  <el-form
      :model="state"
      ref="directoriesForm"
      label-width="240px"
  >
    <el-divider content-position="right">Directories</el-divider>

    <FormInput
        label="Data:"
        prop="data"
        prompt="Data directory"
        :required="true"
        v-model="data"
    />
    <FormInput
        label="Index:"
        prop="index"
        prompt="Index directory"
        :required="true"
        v-model="index"
    />
    <FormInput
        label="Logs:"
        prop="logs"
        prompt="Logs directory"
        :required="true"
        v-model="logs"
    />
    <FormInput
        label="Configuration:"
        prop="config"
        placeholder="Configuration directory"
        :required="true"
        :disabled="disableConfig"
        v-model="config"
    />
  </el-form>
</template>

<script>
import FormInput from "./FormInput";
import store from "../store/directories";

export default {
  name: "Directories",
  components: {FormInput},
  computed: {
    state: () => store.state,
    data: {
      get: () => store.state.data,
      set: (v) => store.update("data", v)
    },
    index: {
      get: () => store.state.index,
      set: (v) => store.update("index", v)
    },
    logs: {
      get: () => store.state.logs,
      set: (v) => store.update("logs", v)
    },
    config: {
      get: () => store.state.config,
      set: (v) => store.update("config", v)
    },
    disableConfig: () => store.disableConfig()
  },
}
</script>
