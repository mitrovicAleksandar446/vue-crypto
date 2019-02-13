import { http } from './../../services/http'


const state = {
    authUser: null
};

const getters = {
    authUser: state => state.authUser
};

const actions = {
    signup({ commit }, user) {
        http.get("https://www.mocky.io/v2/5185415ba171ea3a00704eed");
        console.log(user, commit);
    }
};

export default {
    state,
    getters,
    actions
}