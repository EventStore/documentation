<template>
  <ClientOnly>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Specification" name="spec">
        <br>
        <span>Specify the configuration details in the form below, then click Validate and Proceed at the bottom.</span>

        <Platform/>

        <Directories ref="directories"/>

        <Security ref="security"/>

        <Topology ref="topology"/>

        <Client ref="client"/>

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

        <Errors @validate="validateConfiguration" @proceed="gotoConfig"/>
      </el-tab-pane>

      <el-tab-pane label="Certificates" name="certs" :disabled="!proceed || !isSecure">
        <Certificates />

        <br><br>
        <el-button @click="gotoTab('spec')">Back to specification</el-button>
        <el-button type="primary" @click="gotoTab('config')">Proceed to configuration</el-button>
      </el-tab-pane>

      <el-tab-pane label="Configuration" name="config" :disabled="!proceed">
        <Configuration :projections="projections"/>

        <br><br>
        <el-button @click="gotoTab('certs')">Back to certificates</el-button>
        <el-button type="primary" @click="gotoTab('client')">Proceed to client connection</el-button>
      </el-tab-pane>

      <el-tab-pane label="Client connection" name="client" :disabled="!proceed">
        <Connection />

        <br><br>
        <el-button @click="gotoTab('config')">Back to configuration</el-button>
      </el-tab-pane>

    </el-tabs>
  </ClientOnly>
</template>

<script>
import Directories from "./deployment/Directories";
import Certificates from "./result/Certificates";
import Configuration from "./result/Configuration";
import Connection from "./result/Connection";
import FormSwitch from "./form/FormSwitch";
import Port from "./shared/Port";
import Errors from "./Errors";
import {error} from "../lib/validate";
import Platform from "./deployment/Platform";
import Topology from "./deployment/Topology";
import Security from "./security/Security";
import security from "../store/security";
import Client from "./client/Client";
import validation from "../store/validation";

export default {
    name:       "Deployment",
    components: {
        Client,
        Topology,
        Platform,
        Directories,
        Security,
        Certificates,
        Configuration,
        Connection,
        FormSwitch,
        Port,
        Errors
    },
    data() {
        return {
            projections: {
                enable: "All",
            },
            validated:   false,
            proceed:     false,
            activeTab:   "spec"
        }
    },
    computed:   {
        isSecure: () => security.state.secure,
    },
    methods:    {
        copyClusterGossipToClient(validate) {
            if (validate) {
                setTimeout(() => this.$refs.topologyForm.validateField("gossip"), 1000);
            }
            if (this.isDnsClusterGossip && this.isDnsClientGossip) {
                this.client.gossip = this.topology.gossip;
            }
        },
        async validateConfiguration() {
            validation.clear();
            this.$refs.directories.validate();
            this.$refs.topology.validate();
            this.$refs.security.validate();
            this.$refs.client.validate();
            this.validated = true;
            this.track("validate");
        },
        gotoConfig() {
            this.proceed = true;
            this.gotoTab(this.isSecure ? "certs" : "config");
        },
        gotoTab(tab) {
            this.track(tab);
            this.activeTab = tab;
        },
        track(action, value) {
            this.$gtm.trackEvent({
                event:    null, // Event type [default = 'interaction'] (Optional)
                category: "Documentation",
                action:   action,
                label:    "Configurator",
                value:    value,
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
