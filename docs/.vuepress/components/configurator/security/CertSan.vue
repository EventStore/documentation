<template>
  <ClientOnly>
    <el-row :gutter="20">
      <el-col :span="8">
        <b>Ext: Subject Alternative Name (SAN)</b>
      </el-col>
      <el-col :span="3">
        {{ extType }}
      </el-col>
      <el-col :span="8">
        <code>{{ value }} </code>
      </el-col>
    </el-row>
  </ClientOnly>
</template>

<script>
import {safe} from "../../../theme/util/strings";

export default {
    name:     "CertSan",
    props:    {
        extType:  String,
        extValue: String
    },
    computed: {
        value() {
            return safe(this.extValue);
        }
    }
}
</script>
<style scoped lang="scss">
.el-row {
  margin-bottom: -20px;
}
</style>
