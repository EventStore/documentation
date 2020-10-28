<template>
  <div>
    {{ alternate ? "Alternatively, v" : "V" }}isit the <a :href="link" target="_blank">Downloads</a> section
    of the {{site}} to download the latest binaries.
  </div>
</template>

<script>
export default {
  name: "Download",
  props: {
    alternate: Boolean,
    ent: Boolean
  },
  computed: {
    link() {
      return this.ent ? "https://developers.eventstore.org/binaries/" : "https://eventstore.com/downloads/";
    },
    site() {
      return this.ent ? "Developers site (only accessible for Enterprise users)" : "Event Store website";
    }
  }
}
</script>

