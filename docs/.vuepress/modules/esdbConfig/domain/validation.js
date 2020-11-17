import Vue from "vue";
import {ValidationSectionRemoved} from "./events";
import {EventBus} from "../../common/eventBus";

export default new Vue({
    data() {
        return {
            errors: {}
        }
    },
    methods:       {
        record(section, field, result, error) {
            const errors = {...this.errors};
            if (!this.errors[section]) {
                errors[section] = [];
            }
            const formErrors = errors[section];
            const existing   = formErrors.find(x => x.field === field);
            if (!existing) {
                formErrors.push({field: field, result: result, error: error});
            } else {
                existing.result = result;
                existing.error  = error;
            }
            this.errors = errors;
        },
        hasSectionErrors(section) {
            return this.errors[section].find(y => y.error);
        },
        removeSection(section) {
            delete this.errors[section];
        },
        clear() {
            this.errors = {};
        }
    },
    computed: {
        hasErrors() {
            for (let x in this.errors) {
                if (this.hasSectionErrors(x)) return true;
            }
            return false;
        },
    },
    created() {
        EventBus.$on(ValidationSectionRemoved, x => this.removeSection(x));
    }
});
