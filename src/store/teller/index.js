'use strict';

import userApi from './../../services/api/user'

const state = {
    inactiveUsersList: []
};

const mutations = {

    setInactiveUsersList(state, users) {
        state.inactiveUsersList = users;
    }
};

const actions = {

    getInactiveUsersList({commit}) {
        return userApi.getInactiveUsers()
            .then(users => commit('setInactiveUsersList', users));
    },

    activateUser({commit, state}, userId) {
        return userApi.activateUser(userId)
            .then(() => {
                const inactiveUsersList = state.inactiveUsersList.filter(user => user.id !== userId);
                commit('setInactiveUsersList', inactiveUsersList);
            });
    },


};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}