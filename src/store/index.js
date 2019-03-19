import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './user'
import dialogModule from './dialog'
import walletModule from './wallet'
import loaderModule from './loader'
import tellerModule from './teller'
import perkModule from './perk'
import achievementModule from './achievement'

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",

    modules: {
        user: userModule,
        dialog: dialogModule,
        wallet: walletModule,
        loader: loaderModule,
        teller: tellerModule,
        perk: perkModule,
        achievement: achievementModule
    }
});

export default store;
