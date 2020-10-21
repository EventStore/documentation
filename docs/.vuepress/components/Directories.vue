<template>
    <el-form
        :model="directories"
        ref="directoriesForm"
        label-width="240px"
    >
      <el-divider content-position="right">Directories</el-divider>

      <el-form-item
          label="Data:"
          prop="data"
          :rules="[ {required: true, message: 'Data directory is required', trigger: 'blur'} ]"
      >
        <el-col :span="10">
          <el-input
              placeholder="Data directory"
              v-bind:value="directories.data"
              v-on:input="refresh($event, 'data')"
              autocomplete="false"
              clearable>
          </el-input>
        </el-col>
      </el-form-item>

      <el-form-item
          label="Index:"
          prop="index"
          :rules="[ {required: true, message: 'Index directory is required', trigger: 'blur'} ]"
      >
        <el-col :span="10">
          <el-input
              placeholder="Index directory"
              v-bind:value="directories.index"
              v-on:input="refresh($event, 'index')"
              autocomplete="false"
              clearable>
          </el-input>
        </el-col>
      </el-form-item>

      <el-form-item
          label="Logs:"
          prop="logs"
          :rules="[ {required: true, message: 'Logs directory is required', trigger: 'blur'} ]"
      >
        <el-col :span="10">
          <el-input
              placeholder="Logs directory"
              v-bind:value="directories.logs"
              v-on:input="refresh($event, 'logs')"
              autocomplete="false"
              clearable>
          </el-input>
        </el-col>
      </el-form-item>

      <el-form-item
          label="Configuration:"
          prop="config"
          :rules="[ {required: true, message: 'Configuration directory is required', trigger: 'blur'} ]"
      >
        <el-col :span="10">
          <el-input
              placeholder="Configuration directory"
              v-bind:value="directories.config"
              v-on:input="refresh($event, 'config')"
              autocomplete="false"
              clearable>
          </el-input>
        </el-col>
      </el-form-item>

    </el-form>
</template>

<script>
export default {
  name: "Directories",
  props: {
    directories: Object,
    prop: String
  },
  methods: {
    refresh(val, field) {
      this.$emit("update", {value: val, prop: this.prop, field: field});
    }
  }
}
</script>

<style scoped>

</style>
