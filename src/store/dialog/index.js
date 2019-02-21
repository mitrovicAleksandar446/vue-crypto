'use strict';

const state = {
    data: null
};

const mutations = {
    setDialogData(state, dialogData) {
        state.data = dialogData;
    }
};

const actions = {
    hideDialog({commit}) {
        commit('setDialogData', null);
    },

    showDialog({commit}, data) {
        commit('setDialogData', data);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}