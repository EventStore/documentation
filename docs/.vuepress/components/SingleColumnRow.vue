<template>
  <el-row :gutter="20">
    <el-col>
      <slot></slot>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: "SingleColumnRow"
}
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
}
</style>
