<template>
  <el-form
          :model="state"
          ref="directoriesForm"
          label-width="240px"
          @validate="checkField"
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
import FormInput from "../form/FormInput";
import store from "../../../store/configurator/directories";
import validationMixin from "../../shared/validationMixin";

export default {
    name:       "Directories",
    mixins:     [validationMixin],
    components: {FormInput},
    computed:   {
        state:         () => store.state,
        data:          store.property("data"),
        index:         store.property("index"),
        logs:          store.property("logs"),
        config:        store.property("config"),
        disableConfig: () => store.disableConfig(),
        section:       () => "Directories"
    },
    methods:    {
        validate() {
            this.$refs.directoriesForm.validate();
        }
    }
}
</script>
