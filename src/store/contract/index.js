'use strict';

import contractApi from './../../services/api/contract'

const state = {
    tellerAddress: null,
    contractAddress: null,
    contractAbi: {}
};

const mutations = {

    setTellerAddress(state, tellerAddress) {
        state.tellerAddress = tellerAddress;
    },

    setContractAddress(state, contractAddress) {
        state.contractAddress = contractAddress;
    },

    setContractAbi(state, abi) {
        state.contractAbi = abi;
    }
};

const actions = {

    getContract({commit}) {

        return contractApi.getContract()
            .then((contract) => {
                commit('setTellerAddress', contract.teller_addresses[0]);
                commit('setContractAddress', contract.address);
                commit('setContractAbi', JSON.parse(contract.abi));
            });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}