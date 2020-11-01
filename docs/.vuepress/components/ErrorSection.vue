<template>
  <ClientOnly>
    <div :style="{color: sectionColour}">
      <i :class="icon"></i> {{ index }}
      <ul>
        <li v-for="(field, i) in sectionErrors" :key="`err${i}`">
          {{ field.error }}
        </li>
      </ul>
    </div>
  </ClientOnly>
</template>

<script>
export default {
    name:     "ErrorSection",
    props:    {
        index:   String,
        section: Array
    },
    computed: {
        errors() {
            return this.section;
        },
        hasErrors() {
            return this.sectionErrors.length !== 0;
        },
        icon() {
            return this.hasErrors ? "el-icon-warning" : "el-icon-success";
        },
        sectionColour() {
            return !this.hasErrors ? "green" : "red";
        },
        sectionErrors() {
            return this.errors.filter(x => !x.result && x.error != null)
        }
    }
}
</script>
