const format = (name, value) => value !== undefined ? `&${name}=${value}` : "";

const getHelp = (isEnabled, name, value) =>
    isEnabled && value !== undefined && value !== -1 && value < 10000
        ? `We recommend setting ${name} greater or equal to 10,000 ms.`
        : "";

export default {
    minKeepAliveTimeoutValueHelp: (enabled, timeout) => getHelp(enabled, "keepAliveTimeout", timeout),
    minKeepAliveIntervalValueHelp: (enabled, interval) => getHelp(enabled, "keepAliveInterval", interval),
    getConnectionStringValue() {
        return !this.state.isEnabled
            ? "&keepAliveInterval=-1&keepAliveTimeout=-1"
            : `${format("keepAliveTimeout", this.state.keepAliveTimeout)}${format("keepAliveInterval", this.state.keepAliveInterval)}`;
    }
}
