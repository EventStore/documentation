import {createStore} from "../baseStore";
import {ValidationSectionRemoved} from "./events";

export default createStore(
    {
        state:   {
            errors: {}
        },
        methods: {
            record(section, field, result, error) {
                const errors = {...this.state.errors};
                if (!this.state.errors[section]) {
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
                this.state.errors = errors;
            },
            hasSectionErrors(section) {
                return this.state.errors[section].find(y => y.error);
            },
            hasErrors() {
                for (let x in this.state.errors) {
                    if (this.hasSectionErrors(x)) return true;
                }
                return false;
            },
            removeSection(section) {
                delete this.state.errors[section];
            },
            clear() {
                this.state.errors = {};
            }
        },
        eventHandlers: {
            [ValidationSectionRemoved]: (s, x) => s.removeSection(x)
        }
    },
    "validation"
);
