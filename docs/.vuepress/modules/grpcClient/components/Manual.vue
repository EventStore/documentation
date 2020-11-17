<template>
  <ClientOnly>
    <el-form
            label-width="240px"
            :model="state"
    >
      <el-form-item label="Connect to:" prop="cluster">
        <el-switch
                v-model="cluster"
                active-text="Cluster"
                inactive-text="Single node">
        </el-switch>
      </el-form-item>

      <el-form-item label="Protocol security:" prop="secure">
        <el-switch
                v-model="secure"
                :disabled="disableSecurity"
                active-text="Secure"
                inactive-text="Insecure">
        </el-switch>
      </el-form-item>

      <ClusterConnection/>

    </el-form>
  </ClientOnly>
</template>

<script>
import connection from "../domain/connection";
import ClusterConnection from "./ClusterConnection";
import {isTrue} from "../../../lib/parse";

export default {
    name:       "Manual",
    components: {ClusterConnection},
    computed:   {
        state:           () => connection,
        disableSecurity: () => connection.cloud,
        cluster:         connection.extendedProperty("cluster", "changeTopology"),
        secure:          connection.extendedProperty("secure", "changeSecurity"),
    },
    mounted() {
        connection.changeTopology(isTrue(this.$route.query.cluster));
    },
}
</script>

