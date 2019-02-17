import { http } from '@/services/http'

const state = {
    authUser: null
};

const actions = {
    signup({ commit }, user) {
        console.log(user);
    }
};

export default {
    state,
    actions
}