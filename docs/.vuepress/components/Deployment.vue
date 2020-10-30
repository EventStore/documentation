<template>
  <ClientOnly>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Specification" name="spec">
        <br>
        <span>Specify the configuration details in the form below, then click Validate and Proceed at the bottom.</span>

        <Platform/>

        <Directories/>

        <!-- Deployment -->


        <!-- Protocols-->

        <el-form
            :model="client"
            :rules="client.rules"
            ref="clientForm"
            label-width="240px"
            @validate="(field, result, error) => checkField('Client connection', field, result, error)"
        >
          <el-divider content-position="right">Protocols and client connection</el-divider>

          <FormSwitch label="Enable TCP for client apps:" prop="enableTcp" v-model="client.enableTcp">
            TCP protocol is disabled by default. If you plan to use the legacy TCP client, you need to enable this
            option.
          </FormSwitch>

          <FormSwitch label="Enable AtomPub:" prop="enableAtomPub" v-model="client.enableAtomPub">
            AtomPub should be enabled for the stream browser to work in the Admin UI.
          </FormSwitch>

          <FormSwitch label="Address translation:" prop="advertiseToClient" v-model="client.advertiseToClient">
            There is some address and port translation between EventStoreDB and connecting clients.
          </FormSwitch>

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
                @validate="(field, result, error) => checkField('Node ' + item.index, field, result, error)"
            >
              <el-form-item
                  prop="clientDnsName"
                  :label="`Node ${item.index} translated address:`"
                  :rules="[ { validator: validateClientNodeDns, trigger: 'blur'} ]"
              >
                <el-input
                    placeholder="DNS name"
                    v-model="item.clientDnsName"
                    autocomplete="false"
                    clearable>
                </el-input>
              </el-form-item>
            </el-form>
          </transition-group>

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
                  v-show="client.advertiseToClient && client.enableTcp"
                  prop="externalTcpPort"
                  :enabled="client.enableTcp && client.advertiseToClient"
                  v-model="client.externalTcpPort"
            >
              This port is used for TCP clients if the translated port doesn't match the port used by the node.
            </Port>
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
              Enabling projections impacts performance. Read more at the
              <a target="_blank" href="/server/20.6/server/projections/#performance-impact">Projections</a>
              documentation page.
            </el-col>
          </el-form-item>

        </el-form>

        <!-- Summary -->

        <el-divider content-position="right">Summary</el-divider>

        <Errors :form-errors="formErrors" @validate="validateConfiguration" @proceed="gotoConfig"/>
      </el-tab-pane>

      <el-tab-pane label="Certificates" name="certs" :disabled="!proceed || !topology.secure">
        <Certificates :directories="directories" :topology="topology" :client="client"/>

        <br><br>
        <el-button @click="gotoTab('spec')">Back to specification</el-button>
        <el-button type="primary" @click="gotoTab('config')">Proceed to configuration</el-button>
      </el-tab-pane>

      <el-tab-pane label="Configuration" name="config" :disabled="!proceed">
        <Configuration :directories="directories" :topology="topology" :client="client" :projections="projections"/>

        <br><br>
        <el-button @click="gotoTab('certs')">Back to certificates</el-button>
        <el-button type="primary" @click="gotoTab('client')">Proceed to client connection</el-button>
      </el-tab-pane>

      <el-tab-pane label="Client connection" name="client" :disabled="!proceed">
        <Connection :topology="topology" :conn="client"/>

        <br><br>
        <el-button @click="gotoTab('config')">Back to configuration</el-button>
      </el-tab-pane>

    </el-tabs>
  </ClientOnly>
</template>

<script>
import * as networks from "../lib/networks";
import Directories from "./Directories";
import Certificates from "./Certificates";
import Configuration from "./Configuration";
import Connection from "./Connection";
import FormSwitch from "./FormSwitch";
import Port from "./Port";
import Errors from "./Errors";
import {ok, error, validateGossip, validateIpAddress, validateDnsName} from "../lib/validate";
import Platform from "./Platform";

const SelfSignedCommonName = "eventstoredb-node";
const SelfSigned = "self-signed";
const DnsGossip = "dns";
const SeedGossip = "seed";

export default {
  name: "Deployment",
  components: {Platform, Directories, Certificates, Configuration, Connection, FormSwitch, Port, Errors},
  data() {
    return {
      directories: {},
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
        externalTcpPort: 1113
      },
      projections: {
        enable: "All",
      },
      validated: false,
      formErrors: {},
      proceed: false,
      activeTab: "spec"
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
      handler: function (val, oldVal) {
        this.populateNodes(val, oldVal);
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
        this.topology.gossipMethod = SeedGossip
        this.client.gossipMethod = SeedGossip
      }
    },
    "topology.platform": {
      immediate: true,
      handler: function (val, oldVal) {
        this.directories = val === "linux" ?
            {
              data: "/var/lib/eventstore",
              index: "/var/lib/eventstore/index",
              logs: "/var/log/eventstore",
              config: "/etc/eventstore"
            } :
            {
              data: "C:\\ESDB\\Data",
              index: "C:\\ESDB\\Index",
              logs: "C:\\ESDB\\Logs",
              config: "C:\\ESDB"
            };
      }
    }
  },
  methods: {
    sync(args) {
      this[args.prop][args.field] = args.value;
    },
    copyClusterGossipToClient(validate) {
      if (validate) {
        setTimeout(() => this.$refs.topologyForm.validateField("gossip"), 1000);
      }
      if (this.isDnsClusterGossip && this.isDnsClientGossip) {
        this.client.gossip = this.topology.gossip;
      }
    },
    populateNodes(newCount, oldCount) {
      if (oldCount) {
        // ensure that the number of nodes is odd
        const diff = newCount - oldCount;
        while (!(newCount % 2)) {
          newCount = newCount + diff;
        }
        if (this.topology.nodesCount !== newCount) {
          this.topology.nodesCount = newCount;
          return;
        }
      }

      if (this.topology.nodes.length === newCount) return;

      while (this.topology.nodes.length > newCount) {
        delete this.formErrors[`Node ${this.topology.nodes[this.topology.nodes.length - 1].index}`]
        this.topology.nodes.pop();
      }

      for (let i = this.topology.nodes.length; i < newCount; i++) {
        const node = {index: i + 1, dnsName: "", intIp: "", extIp: "", clientDnsName: ""};
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
          : validateDnsName(rule, value, callback)
          && unique()
          && this.ensureCaDomainMatch(value, callback);
      if (result) {
        if (this.topology.gossip !== "" && this.isDnsClusterGossip) {
          this.$refs.topologyForm.validateField("gossip");
        }
        if (this.client.gossip !== "" && this.isDnsClientGossip) {
          this.$refs.clientForm.validateField("gossip");
        }
        ok(callback);
      }
    },
    validateClusterNodeDns(rule, value, callback) {
      this.validateNodeDns(rule, value, "dnsName", callback);
    },
    validateClientNodeDns(rule, value, callback) {
      this.validateNodeDns(rule, value, "clientDnsName", callback);
    },
    validateNodeIp(rule, value, callback, source) {
      if (!rule.required && value === "") return ok(callback);

      const prop = Object.keys(source)[0];

      if (!validateIpAddress(rule, value, callback)) return;

      return !this.uniqueNode(prop, value) ? error(callback, `${value} already used`) : ok(callback);
    },
    ensureCaDomainMatch(dnsName, callback) {
      if (!this.topology.secure || this.isSelfSigned) return true;

      const caDomain = this.topology.certCommonName.substring(2);
      return dnsName.endsWith(caDomain) ? true : error(callback, "Certificate CN mismatch");
    },
    async resolveNodeDns(item, propFrom, propTo) {
      const ips = await networks.resolveDns(item[propFrom]);
      item[propTo] = ips === undefined ? "" : ips[0];
    },
    async validateClusterGossip(rule, value, callback) {
      return !this.isDnsClusterGossip ? ok(callback) : await validateGossip(this.topology.nodes, value, callback);
    },
    async validateClientGossip(rule, value, callback) {
      return !this.isDnsClientGossip
          ? ok(callback)
          : this.ensureCaDomainMatch(value, callback) && await validateGossip(this.topology.nodes, value, callback);
    },
    async validateConfiguration() {
      const cb = () => {
      };
      this.$refs.topologyForm.validate(cb);
      this.topology.nodes.forEach(node => this.$refs[`node-${node.index}`][0].validate(cb));
      this.$refs.clientForm.validate(cb);
      this.topology.nodes.forEach(node => this.$refs[`clientNode-${node.index}`][0].validate(cb));
      this.validated = true;
      this.track("validate", this.formErrors.length);
    },
    checkField(form, field, result, error) {
      const errors = {...this.formErrors};
      if (!this.formErrors[form]) {
        errors[form] = [];
      }
      const formErrors = errors[form];
      const existing = formErrors.find(x => x.field === field);
      if (!existing) {
        formErrors.push({field: field, result: result, error: error});
      } else {
        existing.result = result;
        existing.error = error;
      }
      this.formErrors = errors;
    },
    gotoConfig() {
      this.proceed = true;
      this.gotoTab(this.topology.secure ? "certs" : "config");
    },
    gotoTab(tab) {
      this.track(tab);
      this.activeTab = tab;
    },
    track(action, value) {
      this.$gtm.trackEvent({
        event: null, // Event type [default = 'interaction'] (Optional)
        category: "Documentation",
        action: action,
        label: "Configurator",
        value: value,
      });
    }
  },
}
</script>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
  height: 3.5rem;
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
