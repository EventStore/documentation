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
                :disabled="cloud"
                active-text="Secure"
                inactive-text="Insecure">
        </el-switch>
      </el-form-item>

      <Cloud/>

      <ClusterConnection/>

      <h2>Connection string</h2>
      <p>Each SDK has its own way to configure the client, but it's always possible to use the connection string. The
        connection string below is generated according to the configuration you specified above, and it should work with
        each official SDK of EventStoreDB.</p>

      <pre><code>{{ connectionString ? connectionString : "Fill out the form to get the connection string" }}</code></pre>

    </el-form>
  </ClientOnly>
</template>

<script>
import connection from "../store/client/connection";
import ClusterConnection from "./client/ClusterConnection";
import Cloud from "./client/Cloud";
import {isTrue} from "../lib/parse";
import {SubmitCodeBlock} from "../theme/store/mutations";

export default {
    name:       "Connection",
    components: {Cloud, ClusterConnection},
    computed:   {
        state:            () => connection,
        cloud:            () => connection.cloud,
        cluster:          connection.extendedProperty("cluster", "changeTopology"),
        secure:           connection.extendedProperty("secure", "changeSecurity"),
        connectionString: () => connection.connectionString,
    },
    mounted() {
        connection.changeTopology(isTrue(this.$route.query.cluster));
        connection.changeHosting(isTrue(this.$route.query.cloud));
        if (this.$route.query.clusterId) {
            connection.setClusterId(this.$route.query.clusterId);
        }
    },
    watch:      {
        connectionString() {
            this.$store.commit(SubmitCodeBlock, {key: "connectionString", value: this.connectionString});
        }
    }
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
