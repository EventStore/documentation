import {ChangeLanguage, SetSiteLanguages, SubmitCodeBlock, UpdateConnectionString} from "./mutations";
import {GetSelectedLanguage, GetSiteLanguages} from "./getters";
import {setStorageValue, getStorageValue} from "../util/localStorage";
import {getUrlParamValue} from "../util/url"

const prefix = "eventstore-docs";
const langStorageName = "codeLanguage";

function getSelectedCodeLanguage() {
    return getUrlParamValue(langStorageName) || getStorageValue(prefix, langStorageName) || "";
}

const state = {
    connectionString: "",
    codeLanguage: getSelectedCodeLanguage(),
    codeBlocks: {}
};

const mutations = {
    [ChangeLanguage](state, language) {
        state.codeLanguage = language;
        setStorageValue(prefix, langStorageName, language);
    },
    [SetSiteLanguages](state, languages) {
        state.siteLanguages = languages;
    },
    [UpdateConnectionString](state, conn) {
        state.connectionString = conn;
    },
    [SubmitCodeBlock](state, block) {
        state.codeBlocks = {...state.codeBlocks, [block.key]: block.value};
    }
};

const getters = {
    getLanguage: state => codes => {
        return codes.indexOf(state.codeLanguage) !== -1 ? state.codeLanguage : codes[0];
    },
    [GetSiteLanguages]: state => state.siteLanguages,
    [GetSelectedLanguage]: state => state.codeLanguage,
};

export default {
    state,
    mutations,
    getters
};
