'use strict';

import userApi from './../../services/api/user'

const state = {
    authUser: null
};

const actions = {
    async signUp({dispatch}, user) {
       const userExists = await userApi.emailExist(user.email);
       if (!userExists) {
           alert("OK");
           return;
       }
       dispatch("dialog/showDialog", {message: "Email already taken", type: "is-danger"}, {root: true});
    }
};

export default {
    namespaced: true,
    state,
    actions
}