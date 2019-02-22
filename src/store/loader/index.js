'use strict';

const state = {
    active: false
};

const mutations = {
    setActive(state, active) {
        state.active = active;
    }
};

const actions = {
    activateLoader({commit}, active) {
        commit('setActive', active);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}