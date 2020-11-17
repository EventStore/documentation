import validation from "../esdbConfig/domain/validation";

export default {
    methods: {
        checkFormField(form, field, result, error) {
            validation.record(form, field, result, error);
        },
        checkField(field, result, error) {
            validation.record(this.section, field, result, error);
        }
    }
}
