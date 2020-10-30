<template>
  <el-form ref="platformForm" label-width="240px">
    <el-divider content-position="right">Platform</el-divider>

    <el-form-item label="Platform:">
      <el-radio-group v-model="platform">
        <el-radio-button label="linux">Linux</el-radio-button>
        <el-radio-button label="windows">Windows</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
import store from "../store/platform";

export default {
    name:     "Topology",
    computed: {
        platform: {
            get: () => store.state.platform,
            set: (v) => store.changePlatform(v)
        }
    }
}
</script>
