<template>
  <el-form
          :model="model"
          ref="securityForm"
          label-width="240px"
  >
    <el-divider content-position="right">Security</el-divider>

    <el-form-item label="Protocol security:" prop="secure">
      <el-switch
              v-model="secure"
              active-text="Secure"
              inactive-text="Insecure">
      </el-switch>
    </el-form-item>

    <transition name="slide">
      <div v-show="secure">
        <el-form-item
                label="Certificate:"
                prop="cert">
          <el-radio-group v-model="cert">
            <el-radio-button label="self-signed">Self-signed</el-radio-button>
            <el-radio-button label="trusted">Public CA</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
                label="Certificate common name:"
                prop="certCommonName"
                :rules="[
                      {required: secure, message: 'Certificate CN is required'},
                      {validator: validateCertCn, trigger: 'blur'},
                    ]"
        >
          <el-col :span="10">
            <el-input
                    v-model="certCommonName"
                    :disabled="isSelfSigned"
                    :placeholder="publicCaPrompt"
            >
            </el-input>
          </el-col>
          <el-col :span="10" class="form-help">
            <span v-html="certCnHelp"></span>
          </el-col>
        </el-form-item>
      </div>
    </transition>

  </el-form>
</template>

<script>
import store from "../store/security";
import * as networks from "../lib/networks";
import {error} from "../lib/validate";

export default {
    name:     "Security",
    computed: {
        model: () => store.state,
        secure:         {
            get: () => store.state.secure,
            set: v => store.update("secure", v)
        },
        cert:           {
            get: () => store.state.cert,
            set: v => store.updateCertType(v)
        },
        certCommonName: {
            get: () => store.state.certCommonName,
            set: v => store.update("certCommonName", v)
        },
        isSelfSigned:   () => store.isSelfSigned(),
        isCluster:      () => store.isCluster(),
        publicCaPrompt() {
            return this.isSelfSigned ? "" : this.isCluster ? "*.example.com" : "esdb.example.com";
        },
        certCnHelp() {
            return this.isSelfSigned
                ? "Must be <code>eventstoredb-node</code> for self-signed certificate."
                : `You need a ${this.isCluster ? "wildcard " : ""}certificate signed by a public trusted CA.`;
        }
    },
    methods:  {
        validateCertCn(rule, value, callback) {
            if (!this.secure || this.isSelfSigned) return;

            const preValid = !this.isCluster || value.startsWith("*.");
            if (!preValid || !networks.isValidDns(value.substring(2))) {
                return error(callback, "Please enter a valid wildcard certificate CN");
            }
            callback();
        }
    }
}
</script>
