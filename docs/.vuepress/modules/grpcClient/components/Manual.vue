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

      <el-form-item label="KeepAlive:" prop="keepAlive.isEnabled">
        <el-switch
                v-model="keepAlive.isEnabled"
                :disabled="disableKeepAlive"
                active-text="Enabled"
                inactive-text="Disabled">
        </el-switch>
      </el-form-item>

      <KeepAlive ref="keepAliveForm" :keepAlive="keepAlive"/>

      <ClusterConnection/>

    </el-form>
  </ClientOnly>
</template>

<script>
import connection from "../domain/connection";
import ClusterConnection from "./ClusterConnection";
import KeepAlive from "./KeepAlive";
import {isTrue} from "../../../lib/parse";

export default {
    name:       "Manual",
    components: {ClusterConnection, KeepAlive},
    computed:   {
        state:            () => connection,
        disableSecurity:  () => connection.cloud,
        disableKeepAlive: () => connection.cloud,
        cluster:          connection.extendedProperty("cluster", "changeTopology"),
        secure:           connection.extendedProperty("secure", "changeSecurity"),
        keepAlive:        connection.extendedProperty("keepAlive", "changeKeepAlive")
    },
    mounted() {
        connection.changeTopology(isTrue(this.$route.query.cluster));
    },
}
</script>

