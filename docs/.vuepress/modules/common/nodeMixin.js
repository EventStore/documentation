import nodesStore from "../esdbConfig/domain/nodes";
import {ok, validateItem} from "../../lib/validate";
import validationMixin from "./validationMixin";

export default {
    mixins: [validationMixin],
    methods: {
        ignore(_){
            return false;
        },
        validateNodeDns(rule, value, callback) {
            return value === "" || this.ignore(rule.field)
                ? ok(callback)
                : validateItem(nodesStore.validateNodeDns(rule.field, value), callback);
        },
        validateNodeIp(rule, value, callback) {
            return this.ignore(rule.field)
                ? ok(callback)
                : validateItem(nodesStore.validateNodeIp(rule.field, value), callback);
        },
        validateNodeAddress(rule, value, callback) {
            return this.ignore(rule.field)
                ? ok(callback)
                : validateItem(nodesStore.validateNodeAddress(rule.field, value), callback);
        },
        async resolveNodeDns() {
            await this.node.resolveDnsName();
        },
        checkNodeField(index, field, result, error) {
            this.checkFormField(`Node ${index}`, field, result, error);
        },
        revalidate(formPrefix, field) {
            nodesStore.nodes.forEach(node => {
                const formRef = `${formPrefix}-${node.index}`;
                let form = this.$refs[formRef];
                if (Array.isArray(form)) form = form[0];
                if (form !== undefined)
                    form.validateField(field)
            });
        },
    }
}
