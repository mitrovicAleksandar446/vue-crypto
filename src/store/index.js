import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './user'
import dialogModule from './dialog'
import toastModule from './toast'
import walletModule from './wallet'
import loaderModule from './loader'
import tellerModule from './teller'
import perkModule from './perk'
import achievementModule from './achievement'
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
        teller: tellerModule,
        perk: perkModule,
        achievement: achievementModule,
        contract: contractModule,
    }
});

export default store;
