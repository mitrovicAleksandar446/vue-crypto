'use strict';

import userApi from './../../services/api/user'
import ethWallet from './../../services/eth/wallet'
import Storage from './../../services/Storage'
import {JWT_TOKEN_NAME} from './../../config'
import {isTokenValid, removeToken} from "../../utils/helpers";
import {EventBus} from "../../services/eventBus";

const state = {
    authUser: null
};

const mutations = {

    setAuthUser(state, user) {
        state.authUser = user;
    }
};

const getters = {

    userRoles(state) {
        return state.authUser ? state.authUser.roles.map(r => r.id) : [];
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
            expireDate: tokenExpirationDate.getTime()
        }));
    },

    getUser({commit}) {
        return userApi.getUser()
            .then(user => {
                commit('setAuthUser', user);
            })
            .catch(err => {
                EventBus.$emit('i-got-401-error', err);
            });
    },

    signOut({dispatch, commit}) {
        if (isTokenValid()) {
            return userApi.signOut()
                .then(() => {
                    removeToken();
                    commit('setAuthUser', null);
                    dispatch('wallet/clearWallet', null, {root: true});
                });
        } else {
            return new Promise((resolve) => {
                removeToken();
                commit('setAuthUser', null);
                dispatch('wallet/clearWallet', null, {root: true});
                resolve(true);
            });
        }
    }
};

export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}