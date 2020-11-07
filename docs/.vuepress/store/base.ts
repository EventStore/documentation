import Vue from "vue";
import {EventBus} from "./eventBus";

interface EventHandlers {
    [index: string]: (payload: any) => void;
}

export abstract class BaseStore<TState> {
    public state: TState;
    protected eventHandlers: EventHandlers;

    protected constructor(state: TState) {
        this.state = Vue.observable<TState>(state);
        Vue.nextTick(() => setTimeout(() => this.initialize(), 100));
    }

    protected initialize() { }

    update(which: string, value: string): void{
        this.state[which] = value;
    }

    emit(event: string, payload: any): void{
        EventBus.$emit(event, payload);
    }

    extendedProperty = (which: string, setter ) => {
        return {
            get: () => this.state[which],
            set: value => this[setter](value)
        }
    }

    property = (which: string) => {
        return {
            get: () => this.state[which],
            set: value => this.state[which] = value
        }
    };
}

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
