import nodesStore from "../../../store/configurator/nodes";
import {error, ok} from "../../../lib/validate";
import validationMixin from "./validationMixin";

export default {
    mixins: [validationMixin],
    methods: {
        ignore(field){
            return false;
        },
        validateNodeDns(rule, value, callback) {
            const checkDns = () => {
                const err = nodesStore.validateNodeDns(rule.field, value);
                return err == null ? ok(callback) : error(callback, err);
            }

            return value === "" || this.ignore(rule.field) ? ok(callback) : checkDns();
        },
        validateNodeIp(rule, value, callback) {
            if (this.ignore(rule.field)) return ok(callback);

            const result = nodesStore.validateNodeIp(rule.field, value);
            return result == null ? ok(callback) : error(callback, result);
        },
        async resolveNodeDns() {
            await this.node.resolveDnsName();
        },
        checkNodeField(index, field, result, error) {
            this.checkFormField(`Node ${index}`, field, result, error);
        },
        revalidate(formPrefix, field) {
            nodesStore.state.nodes.forEach(node => {
                const formRef = `${formPrefix}-${node.index}`;
                let form = this.$refs[formRef];
                if (Array.isArray(form)) form = form[0];
                if (form !== undefined)
                    form.validateField(field)
            });
        },
    }
}
