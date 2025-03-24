import {reactive} from "vue";
import {getUrlParamValue} from "../../lib/url";
import {getStorageValue, setStorageValue} from "../../lib/localStorage";

const prefix = "kurrent-docs";
const langStorageName = "codeLanguage";

function getSelectedCodeLanguage() {
    return getUrlParamValue(langStorageName) || getStorageValue(prefix, langStorageName) || "";
}

export default {
    state: reactive({
        connectionString: "",
        codeLanguage: getSelectedCodeLanguage()
    }),
    changeLanguage(language: string) {
        this.state.codeLanguage = language;
        setStorageValue(prefix, langStorageName, language);
    },
    updateConnectionString(conn: string) {
        this.state.connectionString = conn;
    }
}
