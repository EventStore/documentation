<template>
  <el-row :gutter="20">
    <el-col :span="9">
      <b>Extensions - Subject Alternative Name (SAN):</b>
    </el-col>
    <el-col :span="3">
      {{ extType }}
    </el-col>
    <el-col :span="10">
      <code>{{ extValue}} </code>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "CertSan",
  props: {
    extType: String,
    extValue: String
  }
}
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
}
.title {
  font-weight: bold;
}
</style>
