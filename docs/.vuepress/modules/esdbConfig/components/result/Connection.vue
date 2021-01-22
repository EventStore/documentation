<template>
  <ClientOnly>
    <div>
      <h2>Connecting clients</h2>

      <el-radio-group v-model="client">
        <el-radio-button label="tcp" :disabled="!conn.isTcpEnabled">TCP</el-radio-button>
        <el-radio-button label="grpc">gRPC</el-radio-button>
      </el-radio-group>

      <p>Connection string:</p>
      <pre><code>{{ conn.connectionString }}</code></pre>

      <div v-show="conn.selfSigned">
        <p>Note:</p>
        <p>
          You either need to add the CA certificate to the trusted CA store of the client machine, or add
          <code>{{ conn.disableValidate }}</code> to the connection string.
        </p>
      </div>

      <slot></slot>
      <el-button
              type="primary"
              @click="gotoClientDocs"
      >Go to the gRPC clients documentation
      </el-button>
    </div>
  </ClientOnly>
</template>

<script>
import connection from "../../calc/connection";
import {SubmitCodeBlock} from "../../../../theme/store/mutations";

export default {
    name: "Connection",
    // mixins: []
    data() {
        return {
            client: "grpc"
        }
    },
    computed: {
        conn() {
            return connection(this.client);
        }
    },
    watch:    {
        connectionString(val) {

        }
    },
    methods: {
        gotoClientDocs() {
            this.$store.commit(SubmitCodeBlock, {key: "connectionString", value: this.conn.connectionString});
            this.$router.push("/clients/grpc/getting-started/connecting.html")
        }
    }
}
</script>
