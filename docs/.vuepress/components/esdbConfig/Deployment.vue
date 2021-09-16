<template>
  <ClientOnly>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Specification" name="spec">
        <br/>
        <span>
          Specify the configuration details in the form below, then click
          Validate and Proceed at the bottom.
        </span>

        <Platform/>

        <Directories ref="directories"/>

        <!-- <Security ref="security"/>

        <Topology ref="topology"/>

        <Client ref="client"/> -->

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
            <el-col :span="10" class="form-help">
              Enabling projections impacts performance. Read more at the
              <a target="_blank" href="/server/v20/server/projections/#performance-impact">Projections</a>
              documentation page.
            </el-col>
          </el-form-item>
        </el-form>

        <!-- Summary -->

        <el-divider content-position="right">Summary</el-divider>

        <!-- <Errors @validate="validateConfiguration" @proceed="gotoConfig"/> -->
      </el-tab-pane>

      <el-tab-pane
              label="Certificates"
              name="certs"
              :disabled="!proceed || !isSecure"
      >
        <!-- <Certificates/> -->

        <br/><br/>
        <el-button @click="gotoTab('spec')">Back to specification</el-button>
        <el-button type="primary" @click="gotoTab('config')"
        >Proceed to configuration
        </el-button>
      </el-tab-pane>

      <el-tab-pane label="Configuration" name="config" :disabled="!proceed">
        <!-- <Configuration :projections="projections"/> -->

        <br/><br/>
        <el-button @click="gotoTab('certs')">Back to certificates</el-button>
        <el-button type="primary" @click="gotoTab('client')"
        >Proceed to client connection
        </el-button>
      </el-tab-pane>

      <el-tab-pane label="Client connection" name="client" :disabled="!proceed">
        <!-- <Connection>
          <el-button @click="gotoTab('config')">Back to configuration</el-button>
        </Connection> -->

      </el-tab-pane>
    </el-tabs>
  </ClientOnly>
</template>

<script>
import Directories from "./Directories.vue";
// import Certificates from "./result/Certificates";
// import Configuration from "./result/Configuration";
// import Connection from "./result/Connection";
// import FormSwitch from "./form/FormSwitch";
// import Port from "./shared/Port";
// import Errors from "./Errors";
import Platform from "./Platform.vue";
// import Topology from "./deployment/Topology";
// import Security from "./security/Security";
// import security from "../domain/security";
// import Client from "./client/Client";
import validation from "./domain/validation";

export default {
    name:       "Deployment",
    components: {
        // Client,
        // Topology,
        Platform,
        Directories,
        // Security,
        // Certificates,
        // Configuration,
        // Connection,
        // FormSwitch,
        // Port,
        // Errors,
    },
    data() {
        return {
            projections: {
                enable: "All",
            },
            validated:   false,
            proceed:     false,
            activeTab:   "spec",
        };
    },
    computed:   {
        isSecure: () => true//security.secure,
    },
    methods:    {
        async validateConfiguration() {
          validation.clear();
          this.$refs.directories.validate();
          // this.$refs.topology.validate();
          // this.$refs.security.validate();
          // this.$refs.client.validate();
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
        },
    },
};
</script>

<style lang="scss">
//@import "../../styles/slide";

.el-divider__text.is-right {
  right: 30px !important;
  transform: translateY(-50%);
}

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

.el-divider__text.is-right {
  right: 80px;
  transform: translateY(-50%);
}

.el-form-item__label {
  line-height: 34px !important;
  padding-top: 4px !important;
}


.el-switch {
  padding-left: 20px;
  padding-top: 8px;
  line-height: 20px;
}

.el-input-number {
  width: 110px !important;
  display: flex;
  justify-content: center;
}

.el-col-12 {
  width: 45%;
  margin-left: 18px;

}

@media screen and (max-width: 600px) {
  .el-divider__text.is-right {
    right: 10px;
    transform: translateY(-50%);
  }

  .el-form-item__label {
    text-align: left;
    line-height: 20px;
    font-weight: 700;
  }

  .el-input-number {
    width: 120px !important;
  }

  .el-form-item__content {
    margin-left: 0 !important;
    margin-right: 5px !important;
  }

  .form-help {
    padding-top: 10px;
    padding-bottom: 20px;
  }

  .el-col-4 {
    width: 100%;
  }

  .el-col-10 {
    width: 90%;
    justify-content: left;
  }

  .el-col-12 {
    width: 90%;
    margin-left: 0;
  }
}

@media screen and (max-width: 1048px) {
  .el-col-10 {
    width: 100%;
    justify-content: left;
  }
}
</style>
