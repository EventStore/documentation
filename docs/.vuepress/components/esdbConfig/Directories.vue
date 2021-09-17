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
import FormInput from "../form/FormInput.vue";
import store from "./domain/directories";
import validationMixin from "../common/validationMixin";

export default {
    name:       "Directories",
    mixins:     [validationMixin],
    components: {FormInput},
    computed:   {
        state:         store.state,
        data:          store.property("state.data"),
        index:         store.property("state.index"),
        logs:          store.property("state.logs"),
        config:        store.property("state.config"),
        disableConfig: () => store.disableConfig(),
        section:       () => "Directories"
    },
    methods:    {
        validate() {
            this.$refs.directoriesForm.validate();
        }
    },
    created() {
        store.created();
    }
}
</script>
