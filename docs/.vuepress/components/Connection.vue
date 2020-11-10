<template>
  <ClientOnly>
    <div>
      <p></p>
      <el-form
              label-width="240px"
              :model="fetch"
      >
        <el-form-item label="Fetch configuration:" prop="from">
          <el-radio-group v-model="fetch.from">
            <el-radio-button label="cloud">Event Store Cloud</el-radio-button>
            <el-radio-button label="url">Node URL</el-radio-button>
            <el-radio-button label="manual">Specify manually</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <transition name="slide">
        <cloud v-show="fetch.from === 'cloud'" @proceed="proceed"/>
      </transition>

      <transition name="slide">
        <node-url v-show="fetch.from === 'url'" @proceed="proceed"/>
      </transition>

      <el-form
              label-width="240px"
              :model="state"
      >
        <transition name="slide">
          <manual v-show="showManual"/>
        </transition>
      </el-form>

      <h2>Connection string</h2>
      <p>Each SDK has its own way to configure the client, but it's always possible to use the connection string. The
        connection string below is generated according to the configuration you specified above, and it should work
        with
        each official SDK of EventStoreDB.</p>

      <pre><code>{{
          connectionString ? connectionString : "Fill out the form to get the connection string"
        }}</code></pre>

    </div>
  </ClientOnly>
</template>

<script>
import connection from "../store/client/connection";
import Cloud from "./client/Cloud";
import {SubmitCodeBlock} from "../theme/store/mutations";
import NodeUrl from "./client/NodeUrl";
import Manual from "./client/Manual";

export default {
    name:       "Connection",
    components: {Manual, Cloud, NodeUrl},
    data() {
        return {
            fetch: {
                from: "cloud"
            },
            showConfig: false
        }
    },
    computed:   {
        state:            () => connection,
        cluster:          connection.extendedProperty("cluster", "changeTopology"),
        secure:           connection.extendedProperty("secure", "changeSecurity"),
        showManual() {
            return this.fetch.from === 'manual' || this.showConfig;
        },
        connectionString: () => connection.connectionString,
    },
    watch:      {
        "fetch.from"() {
            this.showConfig = false;
        },
        connectionString() {
            this.$store.commit(SubmitCodeBlock, {key: "connectionString", value: this.connectionString});
        }
    },
    methods: {
        proceed() {
            this.showConfig = true;
        }
    }
}
</script>

<style lang="scss">
@import "./styles/slide";

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
</style>
