import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './user'
import dialogModule from './dialog'
import toastModule from './toast'
import walletModule from './wallet'
import loaderModule from './loader'
import perkModule from './perk'
import contractModule from './contract'

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",

    modules: {
        user: userModule,
        dialog: dialogModule,
        toast: toastModule,
        wallet: walletModule,
        loader: loaderModule,
        perk: perkModule,
        contract: contractModule,
    }
});

export default store;
