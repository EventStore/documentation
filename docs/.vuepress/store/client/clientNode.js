import {isValidAddress} from "../../lib/networks";

export default class ClientNode {
    /**
     * @param {number} index
     */
    constructor(index) {
        this.index   = index;
        this.address = "";
        this.port    = 2113;
    }

    /**
     * @param {string} address
     */
    setAddress(address) {
        this.address = address;
    }

    /**
     * Set node port
     * @param {number} port
     */
    setPort(port) {
        this.port = port;
    }

    /**
     * Validate the node address
     * @param {string} address
     * @returns {string|null}
     */
    validateAddress(address) {
        if (address === "") return "Node address required";
        if (!isValidAddress(address)) return "Invalid IP address or DNS name";
        return null;
    }

    /**
     * Checks if the node has valid address
     * @returns {boolean}
     */
    isValid() {
        return this.address !== "" && this.port > 0;
    }
}
