<template>
  <ClientOnly>
    <el-form
            :model="client"
            :rules="client.rules"
            ref="clientForm"
            label-width="240px"
            @validate="checkField"
    >
      <el-divider content-position="right">Protocols and client connection</el-divider>

      <FormSwitch label="Enable TCP for client apps:" prop="enableTcp" v-model="enableTcp">
        TCP protocol is disabled by default. If you plan to use the legacy TCP client, you need to enable this
        option.
      </FormSwitch>

      <FormSwitch label="Enable AtomPub:" prop="enableAtomPub" v-model="client.enableAtomPub">
        AtomPub should be enabled for the stream browser to work in the Admin UI.
      </FormSwitch>

      <FormSwitch label="Address translation:" prop="advertiseToClient" v-model="client.advertiseToClient">
        There is some address and port translation between EventStoreDB and connecting clients.
      </FormSwitch>

      <Gossip ref="clientGossip" :nodes="nodes" :gossip="gossip"/>

      <ClientNodes
              ref="clientNodes"
              :nodes="nodes"
              :advertise-to-client="client.advertiseToClient"
      />

      <transition name="slide">
        <Port label="Translated HTTP"
              v-show="client.advertiseToClient"
              prop="httpPort"
              :enabled="client.advertiseToClient"
              v-model="client.httpPort"
        >
          Translated HTTP port for external communication, if it doesn't match the HTTP port used by the node.
        </Port>
      </transition>
      <transition name="slide">
        <Port label="Translated TCP"
              v-show="client.advertiseToClient && client.tcpEnabled"
              prop="externalTcpPort"
              :enabled="client.tcpEnabled && client.advertiseToClient"
              v-model="client.externalTcpPort"
        >
          This port is used for TCP clients if the translated port doesn't match the port used by the node.
        </Port>
      </transition>

    </el-form>
  </ClientOnly>
</template>

<script>
import ClientNodes from "./ClientNodes";
import FormSwitch from "../form/FormSwitch";
import Port from "../shared/Port";
import store from "../../domain/client";
import Gossip from "../../../common/components/Gossip";
import nodes from "../../domain/nodes";
import validationMixin from "../../../common/validationMixin";

export default {
    name:       "Client",
    mixins:     [validationMixin],
    components: {Gossip, Port, FormSwitch, ClientNodes},
    computed:   {
        client:    () => store,
        gossip:    () => store.gossip,
        nodes:     () => nodes.nodes,
        section:   () => "Client connection",
        enableTcp: store.extendedProperty("tcpEnabled", "enableTcp")
    },
    methods:    {
        validate() {
            this.$refs.clientForm.validate();
            this.$refs.clientGossip.validate();
            if (this.nodes && this.nodes.length > 0)
                this.$refs.clientNodes.validate();
        }
    }
}
</script>
