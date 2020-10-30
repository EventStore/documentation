<template>
  <div>
    <el-form-item label="Protocol security:" prop="secure">
      <el-switch
              v-model="topology.secure"
              active-text="Secure"
              inactive-text="Insecure">
      </el-switch>
    </el-form-item>

    <transition name="slide">
      <div v-show="topology.secure">
        <el-form-item
                label="Certificate:"
                prop="cert">
          <el-radio-group v-model="topology.cert">
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

  </div>
</template>

<script>
export default {
name: "Security"
}
</script>

<style scoped>

</style>
