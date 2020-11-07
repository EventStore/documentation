import Vue from "vue";
import {EventBus} from "./eventBus";

export function createStore(base) {
    const store = {
        state: Vue.observable(base.state),

        update(which, value) {
            this.state[which] = value;
        },

        emit(event, payload) {
            EventBus.$emit(event, payload);
        },

        ...base.methods
    };

    // Add helpers for computed in components
    store.extendedProperty = function (which, setter) {
        return {
            get: () => store.state[which],
            set: value => store[setter](value)
        }
    }

    store.property = function (which) {
        return {
            get: () => store.state[which],
            set: value => store.state[which] = value
        }
    };

    for (let e in base.eventHandlers) {
        EventBus.$on(e, x => base.eventHandlers[e](store, x));
    }

    if (base.init) {
        Vue.nextTick(function () {
            setTimeout(() => base.init(store), 100);
        });
    }

    return store;
}
