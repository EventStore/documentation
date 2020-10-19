<template>
  <div>
    <!-- Deployment -->

    <el-form :model="topology" ref="topologyForm" label-width="240px">

      <el-divider content-position="right">Deployment topology</el-divider>

      <el-form-item label="Platform:" prop="platform">
        <el-radio-group v-model="topology.platform">
          <el-radio-button label="linux">Linux</el-radio-button>
          <el-radio-button label="windows">Windows</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Deployment topology:" prop="cluster">
        <el-switch
            v-model="topology.cluster"
            active-text="Cluster"
            inactive-text="Single node">
        </el-switch>
      </el-form-item>

      <el-form-item label="Protocol security:" prop="secure">
        <el-switch
            v-model="topology.secure"
            active-text="Secure"
            inactive-text="Insecure">
        </el-switch>
      </el-form-item>

      <el-form-item label="Certificate:" prop="cert">
        <el-radio-group v-model="topology.cert" :disabled="!topology.secure">
          <el-radio-button label="self-signed">Self-signed</el-radio-button>
          <el-radio-button label="trusted">Public CA</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item
          label="Certificate common name:"
          prop="certCommonName"
          :rules="[
            {required: topology.secure, message: 'Certificate CN is required'},
            {validator: validateCertCn, trigger: 'blur'},
          ]"
      >
        <el-col :span="10">
          <el-input
              v-model="topology.certCommonName"
              v-if="topology.secure"
              :disabled="isSelfSigned"
              :placeholder="publicCaPrompt"
          >
          </el-input>
          <span v-else class="form-text">Not applicable</span>
        </el-col>
        <el-col :span="10" v-if="topology.secure" class="form-help">
          <span v-html="certCnHelp"></span>
        </el-col>
      </el-form-item>

      <el-form-item label="Number of nodes:" prop="nodesCount">
        <el-col :span="10">
          <el-input-number
              v-model="topology.nodesCount"
              :min="topology.minNodes"
              :max="topology.maxNodes"
          >
          </el-input-number>
        </el-col>
        <el-col :span="12" v-if="topology.cluster" class="form-help">
          We recommend three nodes for the HA cluster.
        </el-col>
      </el-form-item>

      <el-form-item label="Separate interfaces:" prop="separateNetworks">
        <el-col :span="10">
          <el-switch v-model="topology.separateNetworks"/>
        </el-col>
      </el-form-item>

      <transition-group name="slide" mode="in-out">
        <el-form
            label-width="240px"
            v-for="item in topology.nodes"
            :key="`node-${item.index}`"
            :ref="`node-${item.index}`"
            :model="item"
            :inline="true"
        >
          <el-form-item
              prop="dnsName"
              :label="`Node ${item.index} address:`"
              :rules="[ { validator: validateClusterNodeDns, trigger: 'blur'} ]"
          >
            <el-input
                placeholder="DNS name (optional)"
                v-model="item.dnsName"
                @change="resolveNodeDns(item, 'dnsName', 'extIp')"
                autocomplete="false"
                clearable>
            </el-input>
          </el-form-item>

          <el-form-item
              prop="extIp"
              :rules="[
                  {required: true, message: 'Node IP address is required'},
                  { validator: validateNodeIp, trigger: 'blur'}
                ]"
          >
            <el-input
                placeholder="External IP"
                v-model="item.extIp"
                autocomplete="false"
                clearable>
            </el-input>
          </el-form-item>

          <transition name="el-zoom-in-center">
            <el-form-item
                prop="intIp"
                v-show="topology.separateNetworks"
                :rules="[ { validator: validateNodeIp, required: topology.separateNetworks, trigger: 'blur'} ]"
            >
              <el-input
                  placeholder="Internal IP"
                  v-model="item.intIp"
                  autocomplete="false"
                  clearable>
              </el-input>
            </el-form-item>
          </transition>
        </el-form>
      </transition-group>

      <transition name="slide" mode="out-in">
        <div v-show="topology.cluster">
          <el-form-item label="Gossip for cluster nodes:" prop="gossipMethod">
            <el-col :span="10">
              <el-radio-group
                  v-model="topology.gossipMethod"
                  :disabled="topology.secure && !isSelfSigned"
              >
                <el-radio-button label="dns">Cluster DNS</el-radio-button>
                <el-radio-button label="seed">Nodes seed</el-radio-button>
              </el-radio-group>
            </el-col>
            <el-col :span="12" v-if="topology.cluster && topology.secure && !isSelfSigned" class="form-help">
              When nodes use wildcard certificate, cluster gossip can only use the nodes seed.
            </el-col>
          </el-form-item>

          <transition name="slide" mode="out-in">
            <el-form-item
                label="Cluster gossip DNS:"
                prop="gossip"
                v-show="isDnsClusterGossip"
                :rules="[
              {required: isDnsClusterGossip, message: 'Cluster DNS name required', trigger: 'blur'},
              {validator: validateClusterGossip, trigger: 'blur'}
            ]"
            >
              <el-col :span="10">
                <el-input
                    placeholder="Cluster DNS name"
                    v-model="topology.gossip"
                    clearable>
                </el-input>
              </el-col>
            </el-form-item>
          </transition>
        </div>
      </transition>
      <el-form-item
          label="HTTP port:"
          prop="httpPort"
          :rules="[{ required: true, message: 'HTTP port is required' }]"
      >
        <el-col :span="4">
          <el-input v-model.number="topology.httpPort"/>
        </el-col>
        <el-col :span="6">&nbsp;</el-col>
        <el-col :span="12" class="form-help">
          HTTP port for internal and external communication over gRPC and
          endpoints like stats and gossip.
        </el-col>
      </el-form-item>

      <el-form-item
          label="Internal TCP port:"
          prop="internalTcpPort"
          :rules="[{ required: topology.cluster, message: 'HTTP port is required' }]"
      >
        <el-col :span="4">
          <el-input v-model.number="topology.internalTcpPort"/>
        </el-col>
        <el-col :span="6">&nbsp;</el-col>
        <el-col :span="12" class="form-help">
          Even when TCP is disabled, cluster nodes still perform replication over TCP internally.
        </el-col>
      </el-form-item>

      <el-form-item
          label="External TCP port:"
          prop="externalTcpPort"
          :rules="portRules(client.enableTcp, 'External TCP')"
      >
        <el-col :span="4">
          <el-input
              v-model.number="topology.externalTcpPort"
              v-if="client.enableTcp"
          />
          <span v-else class="form-text">Not applicable</span>
        </el-col>
        <el-col :span="6">&nbsp;</el-col>
        <el-col :span="12" class="form-help">
          This port is used for TCP clients. You only need it if you have application using legacy TCP clients.
        </el-col>
      </el-form-item>

    </el-form>

    <!-- Protocols-->

    <el-form :model="client" :rules="client.rules" ref="clientForm" label-width="240px">
      <el-divider content-position="right">Protocols and client connection</el-divider>

      <el-form-item label="Enable TCP for client apps:" prop="enableTcp">
        <el-col :span="10">
          <el-switch v-model="client.enableTcp"/>
        </el-col>
        <el-col :span="12" class="form-help">
          TCP protocol is disabled by default. If you plan to use the legacy TCP client, you need to enable this option.
        </el-col>
      </el-form-item>

      <el-form-item label="Enable AtomPub:" prop="enableAtomPub">
        <el-col :span="10">
          <el-switch v-model="client.enableAtomPub"/>
        </el-col>
        <el-col :span="12" class="form-help">
          AtomPub should be enabled for the stream browser to work in the Admin UI.
        </el-col>
      </el-form-item>

      <el-form-item label="Address translation:" prop="advertiseToClient">
        <el-col :span="10">
          <el-switch v-model="client.advertiseToClient"/>
        </el-col>
        <el-col :span="12" class="form-help">
          There is some address and port translation between EventStoreDB and connecting clients.
        </el-col>
      </el-form-item>

      <transition name="slide">
        <el-form-item
            label="Gossip for clients:"
            v-show="topology.cluster"
            prop="gossipMethod">
          <el-radio-group
              v-model="client.gossipMethod"
              :disabled="topology.secure && !isSelfSigned"
          >
            <el-radio-button label="dns">Cluster DNS</el-radio-button>
            <el-radio-button label="seed">Nodes seed</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </transition>

      <transition name="slide">
        <el-form-item
            label="Clients gossip DNS:"
            v-show="isDnsClientGossip"
            prop="gossip"
            :rules="[
              {required: isDnsClientGossip, message: 'Client gossip DNS name required', trigger: 'blur'},
              {validator: validateClientGossip, trigger: 'blur'},
          ]"
        >
          <el-col :span="10">
            <el-input
                placeholder="Client gossip DNS name"
                v-model="client.gossip"
                :disabled="!isDnsClientGossip"
                autocomplete="false"
                clearable>
            </el-input>
          </el-col>
        </el-form-item>
      </transition>

      <transition-group name="slide" mode="in-out">
        <el-form
            label-width="240px"
            v-show="client.advertiseToClient"
            v-for="item in topology.nodes"
            :key="`clientNode-${item.index}`"
            :ref="`clientNode-${item.index}`"
            :model="item"
            :inline="true"
        >
          <el-form-item
              prop="clientDnsName"
              :label="`Node ${item.index} translated address:`"
              :rules="[ { validator: validateClientNodeDns, trigger: 'blur'} ]"
          >
            <el-input
                placeholder="DNS name (optional)"
                v-model="item.clientDnsName"
                @change="resolveNodeDns(item, 'clientDnsName', 'clientIp')"
                autocomplete="false"
                clearable>
            </el-input>
          </el-form-item>

          <el-form-item
              prop="clientIp"
              :rules="[ { validator: validateNodeIp, required: client.advertiseToClient, trigger: 'blur'} ]"
          >
            <el-input
                placeholder="Node IP"
                v-model="item.clientIp"
                autocomplete="false"
                clearable>
            </el-input>
          </el-form-item>
        </el-form>
      </transition-group>

      <transition name="slide">
        <div v-show="client.advertiseToClient">
          <el-form-item
              label="Translated HTTP port:"
              prop="httpPort"
              :rules="portRules(client.enableTcp && client.advertiseToClient, 'HTTP')"
          >
            <el-col :span="4">
              <el-input v-model.number="client.httpPort"/>
            </el-col>
            <el-col :span="6">&nbsp;</el-col>
            <el-col :span="12" class="form-help">
              Translated HTTP port for external communication, if it doesn't match the HTTP port used by the node.
            </el-col>
          </el-form-item>

          <el-form-item
              label="Translated TCP port:"
              prop="externalTcpPort"
              :rules="portRules(client.enableTcp && client.advertiseToClient, 'External TCP')"
          >
            <el-col :span="4">
              <el-input
                  v-model.number="client.externalTcpPort"
                  v-if="client.enableTcp"
              />
              <span v-else class="form-text">Not applicable</span>
            </el-col>
            <el-col :span="6">&nbsp;</el-col>
            <el-col :span="12" class="form-help">
              This port is used for TCP clients if the translated port doesn't match the port used by the node.
            </el-col>
          </el-form-item>
        </div>
      </transition>

    </el-form>

    <!-- Projections-->

    <el-form :model="projections" ref="projections" label-width="240px">
      <el-divider content-position="right">Projections</el-divider>
      <el-form-item label="Run projections:" prop="enable">
        <el-col :span="10">
          <el-radio-group v-model="projections.enable">
            <el-radio-button label="None"></el-radio-button>
            <el-radio-button label="All"></el-radio-button>
            <el-radio-button label="System"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="12" class="form-help">
          Enabling projections impacts performance.
          Read more at the <a target="_blank" href="/server/20.6/server/projections/#performance-impact">Projections</a>
          documentation
          page.
        </el-col>
      </el-form-item>

    </el-form>

    <transition-group name="slide" tag="ul">
      <li v-for="(e, index) in errors" :key="`error-${index}`" style="color: red">
        {{ e }}
      </li>
    </transition-group>

    <el-form>
      <el-form-item>
        <el-button type="default" @click="validateConfiguration">Validate</el-button>
        <el-button
            :type="errors.length === 0 ? 'primary' : 'danger'"
            @click="validateConfiguration"
            :disabled="!validated"
        >
          Proceed
        </el-button>
      </el-form-item>
    </el-form>

    <Certificates v-if="topology.secure" :topology="topology" :client="client"/>
    <Configuration :topology="topology" :client="client"/>
  </div>
</template>

<script>
import * as networks from "../lib/networks";
import Certificates from "./Certificates";
import Configuration from "./Configuration";

const SelfSignedCommonName = "eventstoredb-node";
const SelfSigned = "self-signed";
const DnsGossip = "dns";

function ok(callback) {
  callback();
  return true;
}

function error(callback, message) {
  callback(new Error(message));
  return false;
}

export default {
  name: "Deployment",
  components: {Certificates, Configuration},
  data() {
    return {
      topology: {
        secure: true,
        cluster: true,
        platform: "linux",
        nodesCount: 3,
        minNodes: 3,
        maxNodes: 999,
        separateNetworks: false,
        cert: SelfSigned,
        certCommonName: SelfSignedCommonName,
        gossipMethod: DnsGossip,
        gossip: "",
        nodes: [
          {
            index: 1,
            intIp: "",
            extIp: "",
            dnsName: "",
            clientDnsName: "",
            clientIp: ""
          }],
        httpPort: 2113,
        internalTcpPort: 1112,
        externalTcpPort: 1113,
      },
      client: {
        gossip: "",
        gossipMethod: DnsGossip,
        enableTcp: true,
        enableAtomPub: true,
        advertiseToClient: false,
        httpPort: 2113,
        internalTcpPort: 1112,
        externalTcpPort: 1113
      },
      projections: {
        enable: "All",
      },
      errors: [],
      validated: false
    }
  },
  computed: {
    publicCaPrompt() {
      return this.isSelfSigned ? "" : this.topology.cluster ? "*.example.com" : "esdb.example.com";
    },
    isDnsClusterGossip() {
      return this.topology.cluster && this.topology.gossipMethod === DnsGossip;
    },
    isDnsClientGossip() {
      return this.topology.cluster && this.client.gossipMethod === DnsGossip;
    },
    isSelfSigned() {
      return this.topology.cert === SelfSigned;
    },
    certCnHelp() {
      return this.isSelfSigned
          ? "Must be <code>eventstoredb-node</code> for self-signed certificate."
          : `You need a ${this.topology.cluster ? "wildcard " : ""}certificate signed by a public trusted CA.`;
    },
  },
  watch: {
    "topology.certCommonName": function (val) {
      if (val === "") return;
      this.topology.nodes.forEach(x => {
        if (x.dnsName !== "") {
          this.$refs[`node-${x.index}`][0].validateField("dnsName");
        }
      });
    },
    "topology.cluster": function (val) {
      if (val) {
        if (this.topology.nodesCount < 3) this.topology.nodesCount = 3;
        this.topology.gossipMethod = DnsGossip;
        this.client.gossipMethod = DnsGossip;
        this.topology.minNodes = 3;
        this.topology.maxNodes = 999;
      } else {
        this.topology.nodesCount = 1;
        this.topology.minNodes = 1;
        this.topology.maxNodes = 1;
        this.topology.gossipMethod = "";
        this.client.gossipMethod = "";
      }
    },
    "topology.secure": function (val) {
      this.topology.cert = val ? SelfSigned : "";
    },
    "topology.nodesCount": {
      immediate: true,
      handler: function () {
        this.populateNodes();
      }
    },
    "topology.gossip": function () {
      this.copyClusterGossipToClient(false);
    },
    "topology.gossipMethod": function () {
      this.copyClusterGossipToClient(true);
    },
    "client.gossipMethod": function () {
      this.copyClusterGossipToClient(true);
    },
    "client.advertiseToClient": function () {
      this.copyClusterGossipToClient(true);
    },
    "topology.cert": function (val) {
      if (val === "") return;

      if (val === SelfSigned) {
        this.topology.certCommonName = SelfSignedCommonName;
      } else {
        this.topology.certCommonName = "";
        this.topology.gossipMethod = "seed"
        this.client.gossipMethod = "seed"
      }
    }
  },
  methods: {
    copyClusterGossipToClient(validate) {
      if (validate) {
        setTimeout(() => this.$refs.topologyForm.validateField("gossip"), 1000);
      }
      if (this.isDnsClusterGossip && this.isDnsClientGossip) {
        this.client.gossip = this.topology.gossip;
      }
    },
    populateNodes() {
      if (this.topology.nodes.length === this.topology.nodesCount) return;

      while (this.topology.nodes.length > this.topology.nodesCount) {
        this.topology.nodes.pop();
      }

      for (let i = this.topology.nodes.length; i < this.topology.nodesCount; i++) {
        const node = {index: i + 1, dnsName: "", intIp: "", extIp: "", clientIp: "", clientDnsName: ""};
        this.topology.nodes.push(node);
      }
    },
    isDns(method) {
      return method === DnsGossip;
    },
    portRules(required, portName) {
      return [
        {required: required, message: `${portName} port is required`},
        {type: 'number', message: 'Port value must be a number'}
      ]
    },
    validateCertCn(rule, value, callback) {
      if (!this.topology.secure || this.isSelfSigned) return;

      const preValid = !this.topology.cluster || value.startsWith("*.");
      if (!preValid || !networks.isValidDns(value.substring(2))) {
        return error(callback, "Please enter a valid wildcard certificate CN");
      }
      callback();
    },
    uniqueNode(prop, value) {
      return this.topology.nodes.filter(x => x[prop] === value).length === 1;
    },
    validateNodeDns(rule, value, property, callback) {
      const unique = () => {
        const u = this.uniqueNode(property, value);
        return u ? true : error(callback, `${value} already used`);
      }

      const result = value === ""
          ? ok(callback)
          : this.validateDnsName(rule, value, callback)
          && unique()
          && this.ensureCaDomainMatch(value, callback);
      if (result) {
        if (this.client.gossip !== "" && this.isDnsClientGossip) {
          this.$refs.topologyForm.validateField("gossip");
        }
        if (this.client.advertiseToClient && this.isDnsClientGossip && this.client.gossip !== "") {
          this.$refs.clientForm.validateField("gossip");
        }
      }
    },
    validateClusterNodeDns(rule, value, callback) {
      return this.validateNodeDns(rule, value, "dnsName", callback);
    },
    validateClientNodeDns(rule, value, callback) {
      return this.validateNodeDns(rule, value, "clientDnsName", callback);
    },
    validateNodeIp(rule, value, callback, source) {
      if (!rule.required && value === "") return ok(callback);

      const prop = Object.keys(source)[0];

      if (!this.validateIpAddress(rule, value, callback)) return;

      return !this.uniqueNode(prop, value) ? error(callback, `${value} already used`) : ok(callback);
    },
    validateDnsName(rule, value, callback) {
      return networks.isValidDns(value) ? true : error(callback, "Invalid DNS name");
    },
    validateIpAddress(rule, value, callback) {
      return value !== "" && networks.isValidIpAddress(value)
          ? true
          : error(callback, "Invalid IP address");
    },
    ensureCaDomainMatch(dnsName, callback) {
      if (this.isSelfSigned) return true;

      const caDomain = this.topology.certCommonName.substring(2);
      return dnsName.endsWith(caDomain) ? true : error(callback, "Certificate CN mismatch");
    },
    async resolveNodeDns(item, propFrom, propTo) {
      const ips = await networks.resolveDns(item[propFrom]);
      item[propTo] = ips === undefined ? "" : ips[0];
    },
    async validateClusterGossip(rule, value, callback) {
      return !this.isDnsClusterGossip ? ok(callback) : await this.validateGossip(value, callback);
    },
    async validateClientGossip(rule, value, callback) {
      return !this.isDnsClientGossip
          ? ok(callback)
          : this.ensureCaDomainMatch(value, callback) && await this.validateGossip(value, callback);
    },
    async validateGossip(value, callback) {
      const ips = await networks.resolveDns(value);
      if (ips === undefined) {
        return error(callback, "Unable to resolve DNS name");
      }
      const notFound = this.topology.nodes.filter(x => x.extIp !== "" && !ips.find(y => y === x.extIp));
      return notFound.length === 0
          ? ok(callback)
          : error(callback, `${value} does not resolve to ${notFound[0].extIp}`);
    },
    validateConfiguration() {
      const callback = (result, errors) => {
        if (result) return;

        console.log(errors);
        const keys = Object.keys(errors);
        keys.forEach(x => this.errors.push(errors[x][0].message));
      }

      this.errors = [];
      this.$refs.topologyForm.validate(callback);
      this.topology.nodes.forEach(node => this.$refs[`node-${node.index}`][0].validate(callback));
      this.$refs.clientForm.validate(callback);
      this.topology.nodes.forEach(node => this.$refs[`clientNode-${node.index}`][0].validate(callback));
      this.validated = true;
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

.form-text {
  font-size: 16px;
}

.form-help {
  font-size: 14px;
  line-height: 18px;
  margin-left: 10px;
}

.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
