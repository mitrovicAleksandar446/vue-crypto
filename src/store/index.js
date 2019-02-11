import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        authUser: null,
        currentPage: null
    }
});

export default store;
