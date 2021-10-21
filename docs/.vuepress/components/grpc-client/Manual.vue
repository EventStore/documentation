<template>
  <div class="p-fluid p-grid">
    <div class="p-field p-col-3">
      Topology:
    </div>
    <div class="p-field p-col">
      <InputSwitch type="text" v-model="connection.state.cluster"/>
    </div>
  </div>
</template>

<script>
import InputSwitch from "primevue/inputswitch";
import connection from "./lib/connection";

export default {
    name:       "Manual",
    components: {InputSwitch},
    setup() {
        const conn = connection;

        const connection = {state: {cluster: false}};
        return {connection};
    }
}
</script>

<style scoped>

</style>
