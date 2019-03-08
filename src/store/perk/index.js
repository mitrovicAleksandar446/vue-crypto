'use strict';

import perkApi from './../../services/api/perk'
import {filesystem} from "../../utils/helpers";
import {EventBus} from "../../services/eventBus";

const state = {
    perksList: [],
    perk: null
};

const mutations = {

    setPerksList(state, list) {
        state.perksList = list;
    },

    setPerk(state, perk) {
        state.perk = Object.assign({}, state.perk, perk);
    }
};

const actions = {

    getAllPerks({commit}) {
        return perkApi.getAll()
            .then(perks => {
                perks.forEach(perk => perk.image = filesystem(perk.image));
                commit('setPerksList', perks);
            })
    },

    getPerk({commit}, perkId) {
        return perkApi.get(perkId)
            .then(perk => {
                perk.image = filesystem(perk.image);
                commit('setPerk', perk)
            })
            .catch(err => EventBus.$emit('i-got-404-error', err));
    },

    createNewPerk(context, perk) {
        return perkApi.create(perk);
    },

    destroyPerk({commit, state}, perkId) {
        return perkApi.destroy(perkId)
            .then(() => {
                commit("setPerksList", state.perksList.filter(perk => perk.id !== perkId));
            });
    },

    updatePerk(context, {payload, perkId}) {
        return perkApi.update(payload, perkId);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}