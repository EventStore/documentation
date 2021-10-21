import {reactive} from "vue";

export default function(index) {
    return {
        state: reactive({
            index: index,
            port: 2113,
            address: ""
        }),

        canFetch() {
            return this.state.port > 0 && this.state.address !== "";
        },
        setAddress(address, port) {
            this.state.address = address;
            this.state.port = port;
        }
    }
}
