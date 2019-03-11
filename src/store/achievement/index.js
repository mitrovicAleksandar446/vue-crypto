'use strict';

import achievementApi from './../../services/api/achievement';
import {EventBus} from "../../services/eventBus";

const state = {
    achievementsList: [],
    achievement: null
};

const mutations = {

    setAchievementsList(state, list) {
        state.achievementsList = list;
    },

    setAchievement(state, achievement) {
        state.achievement = Object.assign({}, state.achievement, achievement);
    }
};

const actions = {

    getAllAchievements({commit}) {
        return achievementApi.getAll()
            .then(achievements => {
                commit('setAchievementsList', achievements);
            })
    },

    getAchievement({commit}, perkId) {
        return achievementApi.get(perkId)
            .then(achievement => {
                commit('setAchievement', achievement)
            })
            .catch(err => EventBus.$emit('i-got-404-error', err));
    },

    createNewAchievement(context, achievement) {
        return achievementApi.create(achievement);
    },

    destroyAchievement({commit, state}, achievementId) {
        return achievementApi.destroy(achievementId)
            .then(() => {
                commit("setAchievementsList", state.achievementsList.filter(achievement => achievement.id !== achievementId));
            });
    },

    updateAchievement(context, {payload, achievementId}) {
        return achievementApi.update(payload, achievementId);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}