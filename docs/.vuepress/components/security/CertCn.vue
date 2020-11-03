<template>
  <ClientOnly>
  <el-row :gutter="20">
    <el-col :span="8" class="title">
      Subject Name - Common Name (CN):
    </el-col>
    <el-col :span="10">
      <code>{{ commonName }}</code>
    </el-col>
  </el-row>
  </ClientOnly>
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
  margin-bottom: -20px;
}
</style>
