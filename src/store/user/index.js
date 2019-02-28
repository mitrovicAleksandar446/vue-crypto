'use strict';

import userApi from './../../services/api/user'
import ethWallet from './../../services/eth/wallet'
import Storage from './../../services/Storage'
import {JWT_TOKEN_NAME} from './../../config'
import {http} from "../../services/http";

const state = {
    authUser: null
};

const mutations = {
    setAuthUser(state, user) {
        state.authUser = user;
    }
};

const actions = {
    async emailIsFree(context, email) {
        const userExists = await userApi.emailExist(email);
        return !userExists;
    },

    async signUp(context, user) {
        const wallet = ethWallet.load(user.email, user.password);
        user.address = wallet.address;
        await userApi.signUp({
            name: user.name,
            email: user.email,
            password: user.password,
            address: user.address,
            roles: user.selectedRoles
        });
    },

    async signIn(context, {email, password}) {
        const accessInfo = await userApi.signIn(email, password);
        const tokenExpirationDate = new Date;
        tokenExpirationDate.setSeconds(tokenExpirationDate.getSeconds() + accessInfo.expires_in);

        Storage.putInLocal(JWT_TOKEN_NAME, JSON.stringify({
            token: accessInfo.access_token,
            expireDate: tokenExpirationDate
        }));
    },

    getUser({commit}) {
        return userApi.getUser()
            .then(user => {
                commit('setAuthUser', user);
            });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}