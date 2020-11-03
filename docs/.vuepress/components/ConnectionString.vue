<template>
  <div>
    <pre><code>{{ connectionString }}</code></pre>
  </div>
</template>

<script>
import connection from "../store/client/connection";

export default {
    name: "ConnectionString",
    computed: {
        connectionString: () => connection.connectionString()
    }
}
</script>
