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
import validation from "../../store/configurator/validation";
import {EventBus} from "../../store/eventBus";

export default {
    name:       "Errors",
    components: {ErrorSection},
    data() {
        return {
            validated: false,
        }
    },
    computed:   {
        check() {
            return validation.errors;
        },
        validateButtonLabel() {
            return `Validate${this.validated ? " again" : ""}`;
        },
        proceedButtonLabel() {
            return !this.validated ? "Validate first" : this.hasErrors() ? "Ignore issues and proceed" : "Proceed";
        }
    },
    methods:    {
        hasErrors() {
            return validation.hasErrors;
        },
        hasSectionErrors(section) {
            return validation.hasSectionErrors(section);
        },
        validateConfiguration() {
            EventBus.$emit("validate");
            this.validated = true;
        },
        proceed() {
            EventBus.$emit("proceed");
        }
    }
}
</script>
