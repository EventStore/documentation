<template>
  <el-form
          :model="model"
          ref="securityForm"
          label-width="240px"
          @validate="checkField"
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
import store from "../../store/security";
import {error, ok} from "../../lib/validate";
import validationMixin from "../shared/validationMixin";

export default {
    name:     "Security",
    mixins:   [validationMixin],
    computed: {
        secure:         store.extendedProperty("secure", "updateSecurity"),
        cert:           store.extendedProperty("cert", "updateCertType"),
        certCommonName: store.extendedProperty("certCommonName", "updateCn"),

        model:          () => store.state,
        publicCaPrompt: () => store.cnPrompt(),
        certCnHelp:     () => store.certCnHelp(),
        isSelfSigned:   () => store.isSelfSigned(),
        section:        () => "Security"
    },
    methods:  {
        validateCertCn(rule, value, callback) {
            const result = store.validateCertCn(value);
            return result == null ? ok(callback) : error(callback, result);
        },
        validate() {
            this.$refs.securityForm.validate();
        }
    }
}
</script>
