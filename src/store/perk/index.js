'use strict';

import perkApi from './../../services/api/perk'
import {filesystem} from "../../utils/helpers";

const state = {
    perksList: []
};

const mutations = {

    setPerksList(state, list) {
        state.perksList = list;
    }
};

const actions = {

    getAllPerks({commit}) {
        return perkApi.getAll()
            .then(perks => {
                perks.forEach(perk => perk.image = filesystem(perk.image));
                commit('setPerksList', perks);
            })
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}