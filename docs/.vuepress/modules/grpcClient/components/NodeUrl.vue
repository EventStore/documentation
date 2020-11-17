<template>
  <ClientOnly>
    <el-form
            label-width="240px"
    >
      <NodeDetails :node="node" :single="true" placeholder="localhost"/>

      <el-form-item>
        <el-button icon="el-icon-magic-stick" type="primary" :disabled="disableFetch" @click="fetchConfig">
          Fetch configuration
        </el-button>&nbsp;&nbsp;&nbsp;<span v-show="error" style="color: red">{{error}}</span>
      </el-form-item>

    </el-form>
  </ClientOnly>
</template>

<script>
import connection from "../domain/connection";
import NodeDetails from "./NodeDetails";
import {getClusterConfig} from "../../../lib/gossip";
import ClientNode from "../domain/clientNode";
import {SeedGossip} from "../../common/gossipTypes";

export default {
    name:       "NodeUrl",
    components: {NodeDetails},
    data() {
        return {
            node:  new ClientNode(0),
            error: undefined
        }
    },
    computed:   {
        disableFetch() {
            return this.node.address === "" || this.node.port <= 0;
        },
    },
    watch: {
        "node.address"() {
            this.error = "";
        }
    },
    methods:    {
        async fetchConfig() {
            const es = await getClusterConfig(this.node.address, this.node.port);
            if (!es.gossip && !es.info) {
                this.error = "Unable to reach the specified node";
                return;
            }

            connection.changeHosting(false);
            if (!es.gossip) {
                connection.changeTopology(false);
                connection.changeSecurity(es.info.authentication.type !== "insecure");
                connection.nodes[0].address = this.node.address;
                connection.nodes[0].port = this.node.port;
            } else {
                connection.changeTopology(true);
                connection.setNodesCount(es.gossip.members.length);
                connection.gossip.setMethod(SeedGossip);
                connection.changeSecurity(es.info.authentication.type !== "insecure");
                for (let i = 0; i < es.gossip.members.length; i++) {
                    connection.nodes[i].address = es.gossip.members[i].httpEndPointIp;
                    connection.nodes[i].port = es.gossip.members[i].httpEndPointPort;
                }
            }

            this.$emit("proceed");
        }
    }
}
</script>
