import {computed, reactive} from "vue";
import {ValidationSectionRemoved} from "./events";
import {EventBus} from "../../common/eventBus";

const state = reactive({
    errors: {}
});

function hasSectionErrors(section) {
    return state.errors[section].find(y => y.error);
};

function removeSection(section) {
    delete state.errors[section];
};

export default {
    state,
    // methods
    record(section, field, result, error) {
        const errors = {...state.errors};
        if (!state.errors[section]) {
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
        state.errors = errors;
    },
    hasSectionErrors,
    removeSection,
    clear() {
        state.errors = {};
    },
    // computed
    hasErrors: computed(() => {
        for (let x in state.errors) {
            if (hasSectionErrors(x)) return true;
        }
        return false;
    }),
    // created
    created() {
        EventBus.on(ValidationSectionRemoved, x => removeSection(x));
    }
};
