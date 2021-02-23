import {validateKeepAlive} from "../../lib/validate";

function formatKeepAlive(name, value) {
    console.log(value);
    return value !== undefined ? `$${name}=${value};` : "";
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
        return this.isEnabled 
            && this.keepAliveTimeout !== undefined && this.keepAliveTimeout < 10000
            ? "We recommended setting keepAliveTimeout greater or equal to 10 000 ms."
            : "";
    }

    minKeepAliveIntervalValueHelp() {
        return this.isEnabled 
            && this.keepAliveInterval !== undefined && this.keepAliveInterval < 10000
            ? "We recommended setting keepAliveInterval greater or equal to 10 000 ms."
            : "";
    }

    getConnectionStringValue() {
        if(!this.isEnabled) {
            return "&keepAliveInterval=-1&keepAliveTimeout=-1";
        }
        
        return `${formatKeepAlive("keepAliveTimeout", this.keepAliveTimeout)}${formatKeepAlive("keepAliveInterval", this.keepAliveInterval)}`
    }

    
}
