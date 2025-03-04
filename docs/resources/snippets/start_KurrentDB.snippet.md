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

This will download the latest version of the database and start it in [insecure mode](/server/v24.10/security/README.md#running-without-security) as a docker image, exposing port `2113` in your `localhost`.

::: warning
It is **not** reccommended to start the database in insecure mode in production environments.

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
EVENTSTORE_INSECURE=true
```

Then, create a docker compose file `docker-compose.yml` with the following:

```yaml
services:
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
This will start up a database cluster of 3 nodes in [insecure mode](/server/v24.10/security/README.md#running-without-security).

::: warning
It is **not** reccommended to start the database in insecure mode in production environments.


<!-- #endregion cluster -->