import {validateKeepAlive} from "../../lib/validate";

function formatKeepAlive(name, value) {
    return value !== undefined ? `$${name}=${value};` : "";
}

function getKeepAliveValueHelp(isEnabled, name, value) {
    return isEnabled 
        && value !== undefined && value != -1 && value < 10000
            ? `We recommend setting ${name} greater or equal to 10 000 ms.`
            : "";
}

export default class KeepAlive {
    constructor() {
        this.keepAliveInterval   = undefined;
        this.keepAliveTimeout    = undefined;
        
        this.isEnabled           = true;
        this.minKeepAlive        = -1;
        this.maxKeepAlive        = Number.MAX_SAFE_INTEGER;
    }

    validate(value, callback) {
        return validateKeepAlive(value, callback);
    }

    minKeepAliveTimeoutValueHelp() {
        return getKeepAliveValueHelp(this.isEnabled, "keepAliveTimeout", this.keepAliveTimeout);
    }

    minKeepAliveIntervalValueHelp() {
        return getKeepAliveValueHelp(this.isEnabled, "keepAliveInterval", this.keepAliveInterval);
    }

    getConnectionStringValue() {
        if(!this.isEnabled) {
            return "&keepAliveInterval=-1&keepAliveTimeout=-1";
        }
        
        return `${formatKeepAlive("keepAliveTimeout", this.keepAliveTimeout)}${formatKeepAlive("keepAliveInterval", this.keepAliveInterval)}`
    }

    
}
