<template>
  <ClientOnly>
    <div>
      <el-form-item label="Hosting model:" prop="cloud">
        <el-col :span="10">
          <el-switch
                  v-model="cloud"
                  inactive-text="Self-hosted"
                  active-text="Event Store Cloud">
          </el-switch>
        </el-col>
        <el-col :span="12" class="form-help">
          Want to get ESDB maintained by people who built it?
          Lean more about <a href="https://www.eventstore.com/event-store-cloud" target="_blank">Event Store Cloud</a>.
          <badge>new</badge>
        </el-col>
      </el-form-item>

      <transition name="slide">
        <el-form-item
                label="Cloud cluster ID:"
                prop="clusterId"
                v-show="cloud"
        >
          <el-col :span="10">
            <el-input
                    placeholder="Cluster ID"
                    v-model="clusterId"
            />
          </el-col>
          <el-col :span="12" class="form-help">
            Find your cluster ID in the <a href="https://console.eventstore.cloud" target="_blank">Cloud Console</a>,
            on the Cluster Details tab.
          </el-col>
        </el-form-item>
      </transition>
    </div>
  </ClientOnly>
</template>

<script>
import connection from "../../store/client/connection";

export default {
    name:     "Cloud",
    computed: {
        state:     () => connection.state,
        cloud:     connection.extendedProperty("cloud", "changeHosting"),
        clusterId: connection.extendedProperty("clusterId", "setClusterId")
    },
}
</script>
