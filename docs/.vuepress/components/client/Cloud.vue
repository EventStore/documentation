<template>
  <ClientOnly>
    <el-form
            label-width="240px"
            :model="form"
    >
      <el-form-item
              label="Cloud cluster ID:"
              prop="clusterId"
              ref="clusterForm"
              :rules="[ { validator: validateAddress, required: true } ]"
      >
        <el-col :span="10">
          <el-input
                  placeholder="Cluster ID"
                  v-model="form.clusterId"
          />
        </el-col>

        <el-col :span="12" class="form-help">
          Find your cluster ID in the <a href="https://console.eventstore.cloud" target="_blank">Cloud Console</a>,
          on the Cluster Details tab.
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button icon="el-icon-magic-stick" type="primary" :disabled="disableFetch" @click="fetchConfig">
          Fetch configuration
        </el-button>
      </el-form-item>
    </el-form>
  </ClientOnly>
</template>

<script>
import connection from "../../store/client/connection";
import {resolveDns} from "../../lib/networks";
import {error, ok} from "../../lib/validate";

export default {
    name:     "Cloud",
    data() {
        return {
            form:      {
                clusterId: "",
            },
            addresses: []
        }
    },
    computed: {
        conn: () => connection,
        disableFetch() {
            return this.form.clusterId === "";
        },
        dnsName() {
            return `${this.form.clusterId}.mesdb.eventstore.cloud`;
        }
    },
    watch:    {
        "form.clusterId"() {
            this.$refs.clusterForm.clearValidate();
            this.addresses = [];
        }
    },
    methods:  {
        async fetchConfig() {
            const addresses = await resolveDns(this.dnsName);
            this.addresses  = addresses;
            if (!addresses) {
                this.$refs.clusterForm.validate();
                return;
            }

            connection.changeHosting(true);
            connection.setClusterId(this.form.clusterId);
            connection.changeTopology(addresses.length > 1);

            this.$emit("proceed");
        },
        validateAddress(rule, value, callback) {
            return this.disableFetch || this.addresses
                ? ok(callback)
                : error(callback, `Unable to resolve the ${this.dnsName} DNS name`);
        }
    }
}
</script>
