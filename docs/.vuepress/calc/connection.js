import client from "../store/client";
import topology from "../store/topology";
import {safe, safeJoin} from "../theme/util/strings";
import nodes from "../store/nodes";
import security from "../store/security";

export default function (sdk) {
    const nodeAddress = node => client.state.advertiseToClient
        ? `${safe(node.clientDnsName)}:${client.state.httpPort}`
        : `${safe(node.dnsName === "" ? node.extIp : node.dnsName)}:${topology.state.httpPort}`;

    const httpPort        = client.state.advertiseToClient ? client.state.httpPort : topology.state.httpPort;
    const gossip          = client.state.gossip.isDnsGossip()
        ? `${safe(client.state.gossip.dnsName)}:${httpPort}`
        : safeJoin(nodes.state.nodes.map(x => nodeAddress(x)));
    const disableValidate = () => {
        switch (sdk) {
            case "dotnet-tcp":
                return "ValidateServer=false";
            default:
                return "&TlsVerifyCert=false";
        }
    };
    const connString      = connectionString(sdk, gossip, httpPort);
    const code            = example(sdk, connString);

    return {
        httpPort:         httpPort,
        isTcpEnabled:     client.isTcpEnabled(),
        gossip:           gossip,
        connectionString: connString,
        example:          code,
        disableValidate:  disableValidate(),
        selfSigned:       security.isSelfSigned(),
    }
}

function connectionString(sdk, gossip, httpPort) {
    switch (sdk) {
        case "dotnet-tcp":
            const isClientDnsGossip = client.state.gossip.isDnsGossip();
            return `${nodes.isSingleNode() ? "ConnectTo" : isClientDnsGossip ? "ClusterDns" : "GossipSeeds"}=`
                + `${nodes.isSingleNode() === 1 ? "tcp://" : ""}`
                + `${isClientDnsGossip ? client.state.gossip.dnsName : gossip};`
                + `${isClientDnsGossip ? "ExternalGossipPort=" + httpPort + ";" : ""}`
                + `UseSsl=${client.isSecure()};`
                + `DefaultCredentials=admin:changeit`;
        default:
            return `esdb://${gossip}?Tls=${client.isSecure()}`;
    }
}

function example(sdk, connectionString) {
    switch (sdk) {
        case "dotnet-grpc":
            return `// Create the client
var settings = EventStoreClientSettings.Create("${connectionString}");
var client = new EventStoreClient(settings);

// Write an event
var eventData = new EventData(
    Uuid.NewUuid(), "TestEvent",
    JsonSerializer.SerializeToUtf8Bytes(
      new { SomeString = "some value" }
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
    "${connectionString}"
);
await connection.ConnectAsync();

// Write an event
var eventData = new EventData(
    Guid.NewGuid(),
    "TestEvent",
    true,
    JsonSerializer.SerializeToUtf8Bytes(
      new { SomeString = "some value" }
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
