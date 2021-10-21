<template>
  <div class="p-fluid p-grid">
    <div class="p-field p-col-3">
      {{label}}:
    </div>
    <div class="p-field p-col">
      <span class="p-float-label">
        <InputText
                id="address"
                type="text"
                v-model="v$.address.$model"
                :class="{'p-invalid':v$.address.$invalid && submitted}"
                @blur="validate"
        />
        <label for="address">Node hostname or IP address</label>
      </span>
      <small v-show="showError(v$.address)" class="p-error">
        {{ errorMessage(v$.address.required, 'Host address') }}
      </small>
    </div>
    <div class="p-field p-col">
      <span class="p-float-label">
        <InputText
                id="port"
                type="text"
                v-model="v$.port.$model"
                :class="{'p-invalid':v$.port.$invalid && submitted}"
                @blur="validate"
        />
        <label for="port">HTTP port</label>
      </span>
      <small v-show="showError(v$.port)" class="p-error">
        {{ errorMessage(v$.port.integer, "HTTP port") }}
      </small>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import InputText from "primevue/inputtext";
import {integer, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

export default {
    name:       "ClusterNode",
    components: {InputText},
    props:      {
        node:        Object,
        single:      Boolean,
        placeholder: String
    },
    setup(props) {
        const errorMessage = (x, name) => x.$message.replace("Value", name);
        const showError    = (x) => (x.$invalid && submitted.value) || x.$pending.$response;

        const label = `Node ${props.single ? '' : props.node.index} details`;

        const rules     = {
            port:    {required, integer},
            address: {required}
        };
        const v$        = useVuelidate(rules, props.node.state);
        const submitted = ref(false);
        const validate  = () => submitted.value = true;

        return {v$, label, submitted, validate, errorMessage, showError};
    }
}
</script>

<style scoped>

</style>
