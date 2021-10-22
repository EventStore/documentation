import {reactive} from "vue";
import {UnwrapNestedRefs} from "@vue/reactivity";

export interface ClusterNodeState {
    index: number;
    port: number;
    address: string;
}

export interface ClusterNode {
    state: UnwrapNestedRefs<ClusterNodeState>,

    canFetch(): boolean;

    setAddress(address: string, port: number);
}


export function clusterNode(index: number): ClusterNode {
    return {
        state: reactive({
            index: index,
            port: 2113,
            address: ""
        }),
        canFetch(): boolean {
            return this.state.port > 0 && this.state.address !== "";
        },
        setAddress(address: string, port: number): void {
            this.state.address = address;
            this.state.port = port;
        }
    }
}
