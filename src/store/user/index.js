'use strict';

import userApi from './../../services/api/user'
import ethWallet from './../../services/eth/wallet';

const state = {
    authUser: null
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
    }
};

export default {
    namespaced: true,
    state,
    actions
}