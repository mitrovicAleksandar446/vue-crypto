'use strict';

import userApi from './../../services/api/user'

const state = {
    authUser: null
};

const actions = {
    async signUp({commit}, user) {
        console.log(await userApi.signUp(user));
        console.log(user);
    }
};

export default {
    state,
    actions
}