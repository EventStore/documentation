import Vue from "vue";
import Vuex from "vuex";
import {ChangeLanguage, SetSiteLanguages} from "./mutations";
import {GetSelectedLanguage, GetSiteLanguages} from "./getters";

const prefix = "eventstore-docs";
const langStorageName = "codeLanguage";

function setStorageValue(name, value) {
    if (typeof localStorage === 'undefined') {
        return;
    }
    localStorage[prefix + name] = value;
}

 function getStorageValue(name) {
    if (typeof localStorage === "undefined") {
        return null;
    }
    name = prefix + name;
    if (typeof localStorage[name] === "undefined") {
        return null;
    }
    return localStorage[name];
}

const state = {
    codeLanguage: null, //getStorageValue(langStorageName),
    siteLanguages: {}
};

const mutations = {
    [ChangeLanguage](state, language) {
        state.codeLanguage = language;
        setStorageValue(langStorageName, language);
    },
    [SetSiteLanguages](state, languages) {
        state.siteLanguages = languages;
    }
};

const getters = {
    getLanguage: (state) => (codes) => {
        return codes.indexOf(state.codeLanguage) !== -1 ? state.codeLanguage : codes[0];
    },
    [GetSiteLanguages]: (state) => state.siteLanguages,
    [GetSelectedLanguage]: (state) => state.codeLanguage
};

Vue.use(Vuex);
export default new Vuex.Store({
    state,
    mutations,
    getters
});
