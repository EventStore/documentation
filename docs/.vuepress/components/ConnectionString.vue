<template>
  <ClientOnly>
  <div>
    <pre><code>{{ connectionString }}</code></pre>
  </div>
  </ClientOnly>
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
