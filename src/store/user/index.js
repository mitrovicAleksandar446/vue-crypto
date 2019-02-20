'use strict';

import userApi from './../../services/api/user'
import {ethClient} from './../../services/ethClient';

const state = {
    authUser: null
};

const actions = {
    async signUp({commit}, user) {
        console.log(await userApi.signUp(user));

        const wallet = ethClient.eth.accounts.wallet.save("test", "dekica");
        console.log(wallet);
    }
};

export default {
    state,
    actions
}