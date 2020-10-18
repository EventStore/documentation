<template>
  <el-row :gutter="20">
    <el-col :span="9" class="title">
      Subject Name - Common Name (CN):
    </el-col>
    <el-col :span="10">
      <code>{{ commonName }}</code>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "CertCn",
  props: {
    commonName: String
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
