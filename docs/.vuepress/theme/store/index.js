import {ChangeLanguage, SetSiteLanguages, UpdateConnectionString} from "./mutations";
import {GetSelectedLanguage, GetSiteLanguages} from "./getters";
import {setStorageValue} from "../util/localStorage";

const prefix = "eventstore-docs";
const langStorageName = "codeLanguage";

const state = {
    codeLanguage: null, //getStorageValue(langStorageName),
    siteLanguages: {},
    connectionString: ""
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
