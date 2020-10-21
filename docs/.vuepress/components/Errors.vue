<template>
  <ClientOnly>
  <div>
    <ErrorSection v-for="(e, index) in check" :key="`error-${index}`" :index="index" :section="e"></ErrorSection>

    <el-form>
      <el-form-item>
        <el-button :type="!hasErrors() ? 'primary' : 'warning'" @click="validateConfiguration">
          {{ validateButtonLabel }}
        </el-button>
        <el-button
            :type="!validated ? 'info' : !hasErrors() ? 'success' : 'danger'"
            @click="proceed"
            :disabled="!validated"
        >
          {{ proceedButtonLabel }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  </ClientOnly>
</template>

<script>
import ErrorSection from "./ErrorSection";

export default {
  name: "Errors",
  components: {ErrorSection},
  props: {
    formErrors: Object
  },
  data() {
    return {
      validated: false,
      errors: {}
    }
  },
  computed: {
    check() {
      return this.formErrors;
    },
    validateButtonLabel() {
      return `Validate${this.validated ? " again" : ""}`;
    },
    proceedButtonLabel() {
      return !this.validated ? "Validate first" : this.hasErrors() ? "Ignore issues and proceed" : "Proceed";
    }
  },
  methods: {
    hasErrors() {
      for (let x in this.formErrors) {
        if (this.hasSectionErrors(x)) return true;
      }
      return false;
    },
    hasSectionErrors(section) {
      return this.formErrors[section].find(y => y.error);
    },
    validateConfiguration() {
      this.$emit("validate");
      this.validated = true;
    },
    proceed() {
      this.$emit("proceed");
    }
  }
}
</script>
