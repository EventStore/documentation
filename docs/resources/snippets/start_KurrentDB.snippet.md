<!-- #region requirements -->
### Requirements

- Docker (and Docker compose for a cluster).
- Access to the internet to pull down docker images.
<!-- #endregion requirements -->

<!-- #region singlenode -->
#### Start single node KurrentDB
To start a single node of KurrentDB in docker simply run the following command:

```bash
docker run \
       -d \
       --name esdb-node \
       -p 2113:2113 \
       docker.eventstore.com/eventstore/eventstoredb-ee:latest \
       --insecure \
       --run-projections=All \
       --enable-atom-pub-over-http
```

This will download the latest version of the database in insecure mode and start it as a docker image, exposing port `2113` in your `localhost`.

<!-- #endregion singlenode -->

<!-- #region cluster -->
#### Start KurrentDB cluster
To start a KurrentDB cluster with 3 nodes, first create a file to have parameters to provide to all nodes and call it `vars.env`, such as:

```yaml
EVENTSTORE_CLUSTER_SIZE=3
EVENTSTORE_RUN_PROJECTIONS=All
EVENTSTORE_DISCOVER_VIA_DNS=false
EVENTSTORE_ENABLE_ATOM_PUB_OVER_HTTP=true
EVENTSTORE_ADVERTISE_HOST_TO_CLIENT_AS=127.0.0.1
EVENTSTORE_START_STANDARD_PROJECTIONS=true
```

Then, create a docker compose file `docker-compose.yml` with the following:

```yaml
services:
  setup:
    image: eventstore/es-gencert-cli:1.0.2
    entrypoint: bash
    user: "1000:1000"
    command: >
      -c "mkdir -p ./certs && cd /certs
      && es-gencert-cli create-ca
      && es-gencert-cli create-node -out ./node1 -ip-addresses 127.0.0.1,172.30.240.11 -dns-names localhost
      && es-gencert-cli create-node -out ./node2 -ip-addresses 127.0.0.1,172.30.240.12 -dns-names localhost
      && es-gencert-cli create-node -out ./node3 -ip-addresses 127.0.0.1,172.30.240.13 -dns-names localhost
      && find . -type f -print0 | xargs -0 chmod 666"
    container_name: setup
    volumes:
      - ./certs:/certs

  node1.eventstore: &template
    image: docker.eventstore.com/eventstore/eventstoredb-ee:latest
    container_name: node1.eventstore
    env_file:
      - vars.env
    environment:
      - EVENTSTORE_INT_IP=172.30.240.11
      - EVENTSTORE_ADVERTISE_HTTP_PORT_TO_CLIENT_AS=2111
      - EVENTSTORE_AdvertiseNodePortToClientAs=2111
      - EVENTSTORE_GOSSIP_SEED=172.30.240.12:2113,172.30.240.13:2113
      - EVENTSTORE_TRUSTED_ROOT_CERTIFICATES_PATH=/certs/ca
      - EVENTSTORE_CERTIFICATE_FILE=/certs/node1/node.crt
      - EVENTSTORE_CERTIFICATE_PRIVATE_KEY_FILE=/certs/node1/node.key
      - EVENTSTORE__TCPPLUGIN__NodeTcpPortAdvertiseAs=1111
      - EVENTSTORE__TCPPLUGIN__NodeTcpPort=1113
    healthcheck:
      test:
        [
          "CMD-SHELL",
          "curl --fail --insecure https://node1.eventstore:2113/health/live || exit 1",
        ]
      interval: 5s
      timeout: 5s
      retries: 24
    ports:
      - 1111:1113
      - 2111:2113
    volumes:
      - ./certs:/certs
    depends_on:
      - setup
    restart: always
    networks:
      clusternetwork:
        ipv4_address: 172.30.240.11

  node2.eventstore:
    <<: *template
    container_name: node2.eventstore
    env_file:
      - vars.env
    environment:
      - EVENTSTORE_INT_IP=172.30.240.12
      - EVENTSTORE_ADVERTISE_HTTP_PORT_TO_CLIENT_AS=2112
      - EVENTSTORE_AdvertiseNodePortToClientAs=2112
      - EVENTSTORE_GOSSIP_SEED=172.30.240.11:2113,172.30.240.13:2113
      - EVENTSTORE_TRUSTED_ROOT_CERTIFICATES_PATH=/certs/ca
      - EVENTSTORE_CERTIFICATE_FILE=/certs/node2/node.crt
      - EVENTSTORE_CERTIFICATE_PRIVATE_KEY_FILE=/certs/node2/node.key
      - EVENTSTORE__TCPPLUGIN__NodeTcpPortAdvertiseAs=1112
      - EVENTSTORE__TCPPLUGIN__NodeTcpPort=1113
    healthcheck:
      test:
        [
          "CMD-SHELL",
          "curl --fail --insecure https://node2.eventstore:2113/health/live || exit 1",
        ]
      interval: 5s
      timeout: 5s
      retries: 24
    ports:
      - 1112:1113
      - 2112:2113
    networks:
      clusternetwork:
        ipv4_address: 172.30.240.12

  node3.eventstore:
    <<: *template
    container_name: node3.eventstore
    environment:
      - EVENTSTORE_INT_IP=172.30.240.13
      - EVENTSTORE_ADVERTISE_HTTP_PORT_TO_CLIENT_AS=2113
      - EVENTSTORE_AdvertiseNodePortToClientAs=2113
      - EVENTSTORE_GOSSIP_SEED=172.30.240.11:2113,172.30.240.12:2113
      - EVENTSTORE_TRUSTED_ROOT_CERTIFICATES_PATH=/certs/ca
      - EVENTSTORE_CERTIFICATE_FILE=/certs/node3/node.crt
      - EVENTSTORE_CERTIFICATE_PRIVATE_KEY_FILE=/certs/node3/node.key
      - EVENTSTORE__TCPPLUGIN__NodeTcpPortAdvertiseAs=1113
      - EVENTSTORE__TCPPLUGIN__NodeTcpPort=1113
    healthcheck:
      test:
        [
          "CMD-SHELL",
          "curl --fail --insecure https://node3.eventstore:2113/health/live || exit 1",
        ]
      interval: 5s
      timeout: 5s
      retries: 24
    ports:
      - 1113:1113
      - 2113:2113
    networks:
      clusternetwork:
        ipv4_address: 172.30.240.13

networks:
  clusternetwork:
    name: eventstoredb.local
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 172.30.240.0/24

```


Next execute:

```bash
docker compose up
```

<!-- #endregion cluster -->