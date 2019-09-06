'use strict';

const state = {
    data: null
};

const mutations = {
    setToastData(state, toastData) {
        state.data = toastData;
    }
};

const actions = {
    hideToast({commit}) {
        commit('setToastData', null);
    },

    showSuccessToast({commit}, message) {
        commit('setToastData', {message: message, type: "is-success", position: "is-top-right"});
    },

    showDangerToast({commit}, message) {
        commit('setToastData', {message: message, type: "is-danger", position: "is-top-right"});
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
