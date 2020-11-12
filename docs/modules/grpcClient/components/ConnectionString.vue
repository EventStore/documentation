<template>
  <ClientOnly>
    <div>
      <!--    <pre v-if="show"><code>{{ connectionString }}</code></pre>-->
      <el-form
              label-width="240px"
      >
        <el-form-item
                label="Connection string:"
        >
          <el-col :span="20">
            <el-input
                    placeholder="Fill out the form above or enter manually"
                    v-model="connectionString"
            />
          </el-col>
        </el-form-item>
      </el-form>
    </div>
  </ClientOnly>
</template>

<script>

import {SubmitCodeBlock} from "../../../.vuepress/theme/store/mutations";

export default {
    name:     "ConnectionString",
    computed: {
        connectionString: {
            get() {
                return this.$store.state.codeBlocks.connectionString;
            },
            set(v) {
                this.$store.commit(SubmitCodeBlock, {key: "connectionString", value: v});
            }
        }
    },
}
</script>
