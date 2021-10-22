<template>
  <div class="p-fluid p-grid">
    <div class="p-field p-col-3">
      {{ label }}:
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
    <div class="p-field p-col-2">
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

<script lang="ts" setup>
import {ref, defineProps} from "vue";
import InputText from "primevue/inputtext";
import {integer, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {ClusterNodeState} from "./lib/clientNode";

interface ClusterNodeProps {
    single: boolean;
    node: ClusterNodeState;
}

const props = defineProps<ClusterNodeProps>();

const errorMessage = (x, name) => x.$message.replace("Value", name);
const showError = (x) => (x.$invalid && submitted.value) || x.$pending.$response;

const label = `Node ${props.single ? '' : props.node.index} details`;

const v$ = useVuelidate({
    port: {required, integer},
    address: {required}
}, props.node);
const submitted = ref(false);
const validate = () => submitted.value = true;
</script>
