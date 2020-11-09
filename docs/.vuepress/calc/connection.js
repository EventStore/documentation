import client from "../store/configurator/client";
import topology from "../store/configurator/topology";
import {safe, safeJoin} from "../theme/util/strings";
import nodes from "../store/configurator/nodes";
import security from "../store/configurator/security";

export default function (sdk) {
    const nodeAddress = (node, tcp) => client.advertiseToClient
        ? `${safe(node.clientAddress)}:${tcp ? client.externalTcpPort : client.httpPort}`
        : `${safe(node.dnsName === "" ? node.extIp : node.dnsName)}:${tcp ? topology.externalTcpPort : topology.httpPort}`;

    const httpPort        = client.advertiseToClient ? client.httpPort : topology.httpPort;
    const gossip          = (tcp) => client.gossip.isDnsGossip()
        ? `${safe(client.gossip.dnsName)}:${httpPort}`
        : safeJoin(nodes.nodes.map(x => nodeAddress(x, tcp)));
    const disableValidate = () => {
        switch (sdk) {
            case "dotnet-tcp":
                return "ValidateServer=false";
            default:
                return "&TlsVerifyCert=false";
        }
    };
    const tcp             = sdk === "dotnet-tcp";
    const connString      = connectionString(sdk, gossip(tcp), httpPort);
    const code            = example(sdk, connString);

    return {
        httpPort:         httpPort,
        isTcpEnabled:     client.isTcpEnabled,
        gossip:           gossip(tcp),
        connectionString: connString,
        example:          code,
        disableValidate:  disableValidate(),
        selfSigned:       security.isSelfSigned,
    }
}

function connectionString(sdk, gossip, httpPort) {
    switch (sdk) {
        case "dotnet-tcp":
            const isClientDnsGossip = client.gossip.isDnsGossip();
            return `${nodes.isSingleNode ? "ConnectTo" : isClientDnsGossip ? "ClusterDns" : "GossipSeeds"}=`
                + `${nodes.isSingleNode ? "tcp://" : ""}`
                + `${isClientDnsGossip ? client.gossip.dnsName : gossip};`
                + `${isClientDnsGossip ? "ExternalGossipPort=" + httpPort + ";" : ""}`
                +  `UseSslConnection=${client.isSecure};`
                + `DefaultCredentials=admin:changeit`;
        default:
            return `esdb://${gossip}?Tls=${client.isSecure}`;
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
