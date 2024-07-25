import {reactive} from "vue";
import type {UnwrapNestedRefs} from "@vue/reactivity";

export interface KeepAliveState {
    interval?: number;
    timeout?: number;
    enabled: boolean;
    min: number;
    max: number;
}

export interface KeepAlive {
    state: UnwrapNestedRefs<KeepAliveState>;
    minKeepAliveTimeoutValueHelp(value?: number): string;
    minKeepAliveIntervalValueHelp(value?: number): string;
    getKeepAliveQuery(): string[];
    enable(enable: boolean): void;
}

const format = (name: string, value?: number): string => `${name}=${value ?? 10000}`;

const getHelp = (isEnabled: boolean, name: string, value?: number): string =>
    isEnabled && value !== undefined && value !== -1 && value < 10000
        ? `We recommend setting ${name} greater or equal to 10,000 ms.`
        : "";

export const keepAlive: KeepAlive = {
    state: reactive<KeepAliveState>({
        interval: undefined,
        timeout: undefined,
        enabled: true,
        min: -1,
        max: Number.MAX_SAFE_INTEGER
    }),
    enable(enable: boolean) {
        this.state.enabled =  enable;
        if (!enable) {
            this.state.interval = undefined;
            this.state.timeout = undefined;
        }
    },
    minKeepAliveTimeoutValueHelp(value?: number): string {
        return getHelp(this.state.enabled, "keepAliveTimeout", value ?? this.state.timeout);
    },
    minKeepAliveIntervalValueHelp(value?: number): string {
        return getHelp(this.state.enabled, "keepAliveInterval", value ?? this.state.interval)
    },
    getKeepAliveQuery(): string[] {
        return !this.state.enabled
            ? []
            : [format("keepAliveTimeout", this.state.timeout), format("keepAliveInterval", this.state.interval)];
    }
}
