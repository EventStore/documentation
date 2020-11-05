<template>
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
              :disabled="cloud"
              active-text="Secure"
              inactive-text="Insecure">
      </el-switch>
    </el-form-item>

    <Cloud/>

    <ClusterConnection/>

  </el-form>
</template>

<script>
import connection from "../store/client/connection";
import ClusterConnection from "./client/ClusterConnection";
import Cloud from "./client/Cloud";
import {isTrue} from "../lib/parse";

export default {
    name:       "Connection",
    components: {Cloud, ClusterConnection},
    computed:   {
        state:      () => connection,
        cloud:      () => connection.cloud,
        cluster:    connection.extendedProperty("cluster", "changeTopology"),
        secure:     connection.extendedProperty("secure", "changeSecurity"),
    },
    mounted() {
        connection.changeTopology(isTrue(this.$route.query.cluster));
        connection.changeHosting(isTrue(this.$route.query.cloud));
        if (this.$route.query.clusterId) {
            connection.setClusterId(this.$route.query.clusterId);
        }
    },
}
</script>

<style lang="scss">
@import "./styles/slide";

.el-row {
  margin-bottom: 20px;
  height: 3.5rem;
}

.form-text {
  font-size: 16px;
}

.form-help {
  font-size: 14px;
  line-height: 18px;
  margin-left: 10px;
}
</style>
