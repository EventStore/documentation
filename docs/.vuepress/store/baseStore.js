import Vue from "vue";

export default function (state, methods) {
    return {
        state: Vue.observable(state),

        update(which, value) {
            this.state[which] = value;
        },

        ...methods
    }
}
