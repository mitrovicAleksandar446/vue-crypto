import { http } from '@/services/http'

const state = {
    authUser: null
};

const actions = {
    signup({ commit }, user) {
        http.get("/v2/5185415ba171ea3a00704eed");
        console.log(user, commit);
    }
};

export default {
    state,
    actions
}