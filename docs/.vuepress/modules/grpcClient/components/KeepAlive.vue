<template>
  <transition name="slide">
    <div v-show="keepAlive.isEnabled">
      <el-form
              :model="keepAlive"
              ref="keepAliveForm"
              label-width="240px"
              @validate="checkField"
      >
        <el-form-item
          label="KeepAlive Interval (ms)"
          prop="keepAliveInterval"
          :rules="[
            {validator: validateKeepAlive, trigger: 'blur'}
          ]"
        >
          <el-col :span="5">
              <el-input-number
                placeholder="10 000"
                v-model="keepAlive.keepAliveInterval"
                :min="keepAlive.minKeepAlive"
                :max="keepAlive.maxKeepAlive"
                :controls="false"
                clearable
              >
              </el-input-number>
          </el-col>
          <el-col :span="10" class="form-help">
            {{ keepAlive.minKeepAliveIntervalValueHelp() }}
          </el-col>
        </el-form-item>
        <el-form-item 
          label="KeepAlive Timeout (ms)"
          prop="keepAliveTimeout"
          :rules="[
            {validator: validateKeepAlive, trigger: 'blur'}
          ]"
        >
          <el-col :span="5">
              <el-input-number
                placeholder="10 000"
                v-model="keepAlive.keepAliveTimeout"
                :min="keepAlive.minKeepAlive"
                :controls="false"
                :max="keepAlive.maxKeepAlive"
                clearable
              >
              </el-input-number>
          </el-col>
          <el-col :span="10" class="form-help">
            {{ keepAlive.minKeepAliveTimeoutValueHelp() }}
          </el-col>
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>

<script>
import validationMixin from "../../common/validationMixin";

export default {
    name:     "KeepAlive",
    mixins:   [validationMixin],
    props:    {
        keepAlive: Object
    },
    methods:  {
        validateKeepAlive(rule, value, callback) {
            this.keepAlive.validate(value, callback);
        },
        async validate() {
            try {
                await this.$refs.keepAliveForm.validate();
            } catch {
            }
        }
    }
}
</script>

