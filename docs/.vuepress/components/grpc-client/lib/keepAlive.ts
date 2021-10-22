import {KeepAliveState} from "./connection";

const format = (name: string, value?: number): string => value !== undefined ? `&${name}=${value}` : "";

const getHelp = (isEnabled: boolean, name: string, value?: number): string =>
    isEnabled && value !== undefined && value !== -1 && value < 10000
        ? `We recommend setting ${name} greater or equal to 10,000 ms.`
        : "";

export function minKeepAliveTimeoutValueHelp(enabled: boolean, timeout?: number): string {
    return getHelp(enabled, "keepAliveTimeout", timeout);
}

export function minKeepAliveIntervalValueHelp(enabled: boolean, interval?: number): string {
    return getHelp(enabled, "keepAliveInterval", interval)
}

export function getConnectionStringValue(keepAlive: KeepAliveState) {
    return !keepAlive.enabled
        ? "&keepAliveInterval=-1&keepAliveTimeout=-1"
        : `${format("keepAliveTimeout", keepAlive.timeout)}${format("keepAliveInterval", keepAlive.interval)}`;
}
