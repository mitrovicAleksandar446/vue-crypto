'use strict';

import contractApi from './../../services/api/contract'
import contractEth from './../../services/eth/contract'

const state = {
    contractAddress: null,
    tellerAddress: null,
    contract: null
};

const mutations = {

    setContractAddress(state, address) {
        state.contractAddress = address;
    },

    setContract(state, contract) {
        state.contract = contract;
    },

    setTellerAddress(state, address) {
        state.tellerAddress = address;
    },
};

const actions = {

    createContract({commit, state, rootState}) {
        return contractApi.getContract()
            .then(contract => {
                commit("setContractAddress", contract.address);
                commit("setTellerAddress", contract.teller_addresses[0]);
                
                const fromAddress = rootState.user.authUser.address;
                const ethContract = contractEth.create(contract.abi, state.contractAddress, fromAddress);
                commit('setContract', ethContract);
            });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}