<template>
  <div>
    <!-- Deployment -->

    <el-divider content-position="right">Deployment topology</el-divider>
    <el-row :gutter="20" type="flex" align="middle">
      <el-col :span="6">
        Platform:
      </el-col>
      <el-col :span="16">
        <el-radio-group v-model="platform">
          <el-radio-button label="linux">Linux</el-radio-button>
          <el-radio-button label="windows">Windows</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" align="middle">
      <el-col :span="6">
        Deployment topology:
      </el-col>
      <el-col :span="16">
        <el-switch
            v-model="topology"
            active-text="Cluster"
            inactive-text="Single node">
        </el-switch>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" align="middle">
      <el-col :span="6">
        Protocol security:
      </el-col>
      <el-col :span="16">
        <el-switch
            v-model="secure"
            active-text="Secure"
            inactive-text="Insecure">
        </el-switch>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" align="middle">
      <el-col :span="6">
        Certificate:
      </el-col>
      <el-col :span="16">
        <el-radio-group v-model="cert" :disabled="!secure">
          <el-radio-button label="self-signed">Self-signed</el-radio-button>
          <el-radio-button label="trusted">Public CA</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" align="middle">
      <el-col :span="6">
        Number of nodes:
      </el-col>
      <el-col :span="6">
        <el-input-number v-model="nodes" :min="minNodes" :max="maxNodes"></el-input-number>
      </el-col>
      <el-col :span="4">
        <el-popover
            placement="top-start"
            title="Tip"
            width="400"
            trigger="hover"
            content="We recommend three nodes for the HA cluster."
            :hidden="!warnNodesNumber"
        >
          <div slot="reference" style="font-size: x-large"><i class="el-icon-warning-outline"></i></div>
        </el-popover>
      </el-col>
    </el-row>
    <el-row gutter="20" type="flex" align="middle">
      <el-col span="6">
        Gossip method:
      </el-col>
      <el-col span="16">
        <el-radio-group v-model="gossipMethod" :disabled="!topology">
          <el-radio-button label="dns">Cluster DNS</el-radio-button>
          <el-radio-button label="seed">Nodes seed</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row gutter="20" type="flex" align="middle">
      <el-col span="6">
        Gossip:
      </el-col>
      <el-col :span="6"
              v-for="item in nodesGossip" :key="item.index"
      >
        <el-input
            v-bind:placeholder="gossipPrompt"
            v-model="gossip"
            clearable>
        </el-input>
      </el-col>
    </el-row>

    <!-- Protocols-->

    <el-divider content-position="right">Protocols and client connection</el-divider>
    <el-row :gutter="20">
      <el-col :span="6">
        Separate internal and external networks:
      </el-col>
      <el-col :span="16">
        <el-switch v-model="differentNetworks"/>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        Gossip method for clients:
      </el-col>
      <el-col :span="16">
        <el-radio-group v-model="gossipMethod" :disabled="!topology">
          <el-radio-button label="dns">Cluster DNS</el-radio-button>
          <el-radio-button label="seed">Nodes seed</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        Enable TCP for client apps:
      </el-col>
      <el-col :span="16">
        <el-switch v-model="enableTcp"/>
      </el-col>
    </el-row>
    <el-row gutter="20">
      <el-col span="6">
        Enable AtomPub:
      </el-col>
      <el-col span="4">
        <el-switch v-model="enableAtomPub"/>
      </el-col>
      <el-col span="3">&nbsp;</el-col>
      <el-col span="10">
        AtomPub should be enabled for the stream browser to work in the Admin UI.
      </el-col>
    </el-row>
    <el-row gutter="20">
      <el-col span="6">
        HTTP port:
      </el-col>
      <el-col span="4">
        <el-input v-model="httpPort" type="number"/>
      </el-col>
      <el-col span="3">&nbsp;</el-col>
      <el-col span="10">
        This port is used for both internal and external communication over gRPC and for HTTP(S)
        endpoints like stats and gossip.
      </el-col>
    </el-row>
    <el-row gutter="20">
      <el-col span="6">
        Internal TCP port:
      </el-col>
      <el-col span="4">
        <el-input v-model="internalTcpPort" type="number"/>
      </el-col>
      <el-col span="3">&nbsp;</el-col>
      <el-col span="10">
        Even when TCP is disabled, cluster nodes still perform replication over TCP internally.
      </el-col>
    </el-row>
    <el-row gutter="20">
      <el-col span="6">
        External TCP port:
      </el-col>
      <el-col span="4">
        <el-input v-model="externalTcpPort" type="number" :disabled="!enableTcp"/>
      </el-col>
      <el-col span="3">&nbsp;</el-col>
      <el-col span="10">
        This port is used for TCP clients.
      </el-col>
    </el-row>

    <!-- Projections-->

    <el-divider content-position="right">Projections</el-divider>
    <el-row :gutter="20">
      <el-col :span="6">
        Run projections:
      </el-col>
      <el-col :span="7">
        <el-radio-group v-model="projections">
          <el-radio-button label="None"></el-radio-button>
          <el-radio-button label="All"></el-radio-button>
          <el-radio-button label="System"></el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="10">
          Enabling projections impacts performance.
          Read more at the <a href="http://localhost:8080/server/20.6/server/projections/#performance-impact">Projections</a> documentation page.
      </el-col>
    </el-row>

    <el-divider content-position="right">Summary</el-divider>
    <p>Secure: {{ secure }}</p>
    <p>Cluster: {{ topology }}</p>
    <p>Platform: {{ platform }}</p>
    <p>Number of nodes: {{ nodes }}</p>
  </div>
</template>

<script>
export default {
  name: "Deployment",
  components: {},
  data() {
    return {
      secure: true,
      topology: true,
      platform: "linux",
      nodes: 3,
      minNodes: 3,
      maxNodes: 999,
      cert: "self-signed",
      gossipMethod: "dns",
      gossip: "",
      nodesGossip: [
        {index: 0, address: ""},
      ],
      enableTcp: true,
      enableAtomPub: true,
      differentNetworks: false,
      projections: "All",
      httpPort: 2113,
      internalTcpPort: 1112,
      externalTcpPort: 1113,
      warnNodesNumber: false,
    }
  },
  computed: {
    gossipPrompt() {
      return this.gossipMethod === "dns" ? "Cluster DNS name" : "Node IP or DNS name";
    }
  },
  watch: {
    topology: function (val) {
      if (val) {
        if (this.nodes < 3) this.nodes = 3;
        this.gossipMethod = "dns";
        this.minNodes = 3;
        this.maxNodes = 999;
      } else {
        this.nodes = 1;
        this.minNodes = 1;
        this.maxNodes = 1;
        this.gossipMethod = "";
      }
      this.populateGossip();
    },
    secure: function (val) {
      this.cert = val ? "self-signed" : "";
    },
    nodes: function () {
      this.populateGossip();
      this.warnNodesNumber = this.nodes > 3;
    },
    gossipMethod: function () {
      this.populateGossip();
    }
  },
  methods: {
    populateGossip() {
      if (this.gossipMethod === "dns") {
        this.nodesGossip = [{index: 0, address: ""}];
        return;
      }

      this.nodesGossip = [];
      for (let i = 0; i < this.nodes; i++)
        this.nodesGossip.push({index: i, address: ""});
    }
  }
}
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
  height: 3.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}
</style>
