<template>
  <ClientOnly>
    <div>
      <h2>Connecting clients</h2>

      <el-radio-group v-model="client">
        <el-radio-button label="dotnet-tcp" :disabled="!conn.enableTcp">.NET TCP</el-radio-button>
        <el-radio-button label="dotnet-grpc">.NET gRPC</el-radio-button>
        <el-radio-button label="nodejs" disabled>NodeJS</el-radio-button>
        <el-radio-button label="java" disabled>Java</el-radio-button>
        <el-radio-button label="go" disabled>Go</el-radio-button>
      </el-radio-group>

      <p>Connection string:</p>
      <pre><code>{{ connectionString }}</code></pre>

      <p>Example:</p>
      <prism language="csharp">{{ example }}</prism>

      <div v-show="this.topology.cert === 'self-signed'">
        <p>Note:</p>
        <p>
          You either need to add the CA certificate to the trusted CA store of the client machine, or add
          <code>{{ disableValidate }}</code> to the connection string.
        </p>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import {safe, safeJoin} from "../theme/util/strings";

export default {
  name: "Connection",
  props: {
    topology: Object,
    conn: Object
  },
  data() {
    return {
      client: "dotnet-grpc"
    }
  },
  watch: {
    connectionString(val) {

    }
  },
  computed: {
    dnsGossip() {
      return this.conn.gossipMethod === "dns";
    },
    httpPort() {
      return this.conn.advertiseToClient ? this.conn.httpPort : this.topology.httpPort;
    },
    gossip() {
      const nodeAddress = node => this.conn.advertiseToClient
          ? `${safe(node.clientDnsName)}:${this.conn.httpPort}`
          : `${safe(node.dnsName === "" ? node.extIp : node.dnsName)}:${this.topology.httpPort}`;

      return this.dnsGossip
          ? `${safe(this.conn.gossip)}:${this.httpPort}`
          : safeJoin(this.topology.nodes.map(x => nodeAddress(x)));
    },
    connectionString() {
      switch (this.client) {
        case "dotnet-tcp":
          return `${this.topology.nodesCount === 1 ? "ConnectTo" : this.dnsGossip ? "ClusterDns" : "GossipSeeds"}=`
              + `${this.topology.nodesCount === 1 ? "tcp://" : ""}`
              + `${this.dnsGossip ? this.conn.gossip : this.gossip};`
              + `${this.dnsGossip ? "ExternalGossipPort=" + this.httpPort + ";" : ""}`
              + `UseSsl=${this.topology.secure};`
              + `DefaultCredentials=admin:changeit`;
        default:
          return `esdb://${this.gossip}?Tls=${this.topology.secure}`;
      }
    },
    disableValidate() {
      switch (this.client) {
        case "dotnet-tcp":
          return "ValidateServer=false";
        default:
          return "&TlsVerifyCert=false";
      }
    },
    example() {
      switch (this.client) {
        case "dotnet-grpc":
          return `// Create the client
var settings = EventStoreClientSettings.Create("${this.connectionString}");
var client = new EventStoreClient(settings);

// Write an event
var eventData = new EventData(
    Uuid.NewUuid(), "TestEvent",
    JsonSerializer.SerializeToUtf8Bytes(
      new { SomeString: "some value" }
    )
);

await client.AppendToStreamAsync(
    "test", StreamState.Any,
    new[] {eventData}
);
`;
        case "dotnet-tcp":
          return `// Create the connection
var connection = EventStoreConnection.Create(
    "${this.connectionString}"
);
await connection.ConnectAsync();

// Write an event
var eventData = new EventData(
    Guid.NewGuid(),
    "TestEvent",
    true,
    JsonSerializer.SerializeToUtf8Bytes(
      new { SomeString: "some value" }
    ),
    null
);

await client.AppendToStreamAsync(
    "test",
    ExpectedVersion.Any,
    eventData
);`;
      }
    }
  }
}
</script>

<style scoped>

</style>
