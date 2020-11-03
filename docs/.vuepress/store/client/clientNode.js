import {isValidAddress} from "../../lib/networks";

export default class ClientNode {
    constructor(index) {
        this.index   = index;
        this.address = "";
        this.port    = 2113;
    }

    setAddress(address) {
        this.address = address;
    }

    setPort(port) {
        this.port = port;
    }

    validateAddress(address) {
        if (address === "") return "Node address required";
        if (!isValidAddress(address)) return "Invalid IP address or DNS name";
        return null;
    }

    validate() {

    }
}
