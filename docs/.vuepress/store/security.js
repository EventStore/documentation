import baseStore from "./baseStore";

const SelfSignedCommonName = "eventstoredb-node";
const SelfSigned           = "self-signed";

const store = baseStore({
        secure:         true,
        cert:           SelfSigned,
        certCommonName: SelfSignedCommonName,
    },
    {
        update(which, value) {
            this.state[which] = value;
        },
    });

export default store;
