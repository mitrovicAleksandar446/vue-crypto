'use strict';

import userApi from './../../services/api/user'

const state = {
    authUser: null
};

const actions = {
    async emailIsFree({dispatch}, email) {
       const userExists = await userApi.emailExist(email);
       if (userExists) {
           dispatch("dialog/showDialog", {message: "Email already taken", type: "is-danger"}, {root: true});
           return false;
       }
       return true;
    },

    async signUp(context, user) {
        console.log("napravio se wallet i pravi se user");
    }
};

export default {
    namespaced: true,
    state,
    actions
}