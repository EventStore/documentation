const format = (name, value) => value !== undefined ? `&${name}=${value}` : "";

const getHelp = (isEnabled, name, value) =>
    isEnabled && value !== undefined && value !== -1 && value < 10000
        ? `We recommend setting ${name} greater or equal to 10 000 ms.`
        : "";

export default {
    state: {
        keepAliveInterval: undefined,
        keepAliveTimeout:  undefined,
        isEnabled:         true,
        minKeepAlive:      -1,
        maxKeepAlive:      Number.MAX_SAFE_INTEGER
    },
    minKeepAliveTimeoutValueHelp() {
        return getHelp(this.state.isEnabled, "keepAliveTimeout", this.state.keepAliveTimeout);
    },
    minKeepAliveIntervalValueHelp() {
        return getHelp(this.state.isEnabled, "keepAliveInterval", this.state.keepAliveInterval);
    },
    getConnectionStringValue() {
        return !this.state.isEnabled
            ? "&keepAliveInterval=-1&keepAliveTimeout=-1"
            : `${format("keepAliveTimeout", this.state.keepAliveTimeout)}${format("keepAliveInterval", this.state.keepAliveInterval)}`;
    }
}
