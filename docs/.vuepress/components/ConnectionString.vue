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
import connection from "../store/client/connection";
import {SubmitCodeBlock} from "../theme/store/mutations";

export default {
    name:     "ConnectionString",
    computed: {
        cs() {
            console.log("computed")
            return this.$store.state.connectionString;
        }
    },
    data() {
        return {
            connectionString: "",
        }
    },
    watch:    {
        cs(s) {
            console.log("cs")
            if (s) this.connectionString = s;
        },
    }
}
</script>
