<template>
  <ClientOnly>
    <div>
      <h2>Connecting clients</h2>

      <el-radio-group v-model="client">
        <el-radio-button label="dotnet-tcp" :disabled="!conn.isTcpEnabled">.NET TCP</el-radio-button>
        <el-radio-button label="dotnet-grpc">.NET gRPC</el-radio-button>
        <el-radio-button label="nodejs" disabled>NodeJS</el-radio-button>
        <el-radio-button label="java" disabled>Java</el-radio-button>
        <el-radio-button label="go" disabled>Go</el-radio-button>
      </el-radio-group>

      <p>Connection string:</p>
      <pre><code>{{ conn.connectionString }}</code></pre>

      <p>Example:</p>
      <prism language="csharp">{{ conn.example }}</prism>

      <div v-show="conn.selfSigned">
        <p>Note:</p>
        <p>
          You either need to add the CA certificate to the trusted CA store of the client machine, or add
          <code>{{ conn.disableValidate }}</code> to the connection string.
        </p>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import connection from "../../calc/connection";

export default {
    name:     "Connection",
    // mixins: []
    data() {
        return {
            client: "dotnet-grpc"
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
}
</script>
