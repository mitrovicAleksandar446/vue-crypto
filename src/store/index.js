import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './user'
import dialogModule from './dialog'

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    state: {
        currentPage: null
    },
    modules: {
        user: userModule,
        dialog: dialogModule
    }
});

export default store;
