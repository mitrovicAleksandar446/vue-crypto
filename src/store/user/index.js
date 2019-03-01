'use strict';

import userApi from './../../services/api/user'
import ethWallet from './../../services/eth/wallet'
import Storage from './../../services/Storage'
import {JWT_TOKEN_NAME} from './../../config'
import {TELLER_ID} from './../../utils/role-types'
import {EMPLOYEE_ID} from './../../utils/role-types'

const state = {
    authUser: null,
    isTeller: null,
};

const mutations = {
    setAuthUser(state, user) {
        state.authUser = user;
    },

    setIsTeller(state, isTeller) {
        state.isTeller = isTeller;
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

    saveUserInfo({dispatch, state, commit}) {
        return dispatch('getUser')
            .then(() => {
                const access = JSON.parse(Storage.getFromLocal(JWT_TOKEN_NAME));
                if (access) {
                    const isTeller = !!state.authUser.roles.find(role => role.id === TELLER_ID);
                    if (isTeller) {
                        access.role = TELLER_ID;
                        commit('setIsTeller', true);
                    } else {
                        access.role = EMPLOYEE_ID;
                    }
                    Storage.putInLocal(JWT_TOKEN_NAME, JSON.stringify(access));
                }
            });
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