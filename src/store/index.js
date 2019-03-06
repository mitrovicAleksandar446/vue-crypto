import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './user'
import dialogModule from './dialog'
import walletModule from './wallet'
import loaderModule from './loader'
import contractModule from './contract'
import inactiveUsersModule from './inactiveUsers'
import perkModule from './perk'

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",

    modules: {
        user: userModule,
        dialog: dialogModule,
        wallet: walletModule,
        loader: loaderModule,
        contract: contractModule,
        inactiveUsers: inactiveUsersModule,
        perk: perkModule
    }
});

export default store;
