'use strict';

import bip39 from 'bip39';
import ethWallet from './../../services/eth/wallet';

const state = {
    mnemonic: null,
    wallet: null
};

const mutations = {
    setMnemonic(state, mnemonic) {
        state.mnemonic = mnemonic;
    },
    setWallet(state, wallet) {
        state.wallet = wallet;
    }
};

const actions = {
    createWallet({commit}, userData) {
        const mnemonic = bip39.generateMnemonic();
        commit('setMnemonic', mnemonic);
        const wallet = ethWallet.create(mnemonic, userData.password, userData.email);
        commit('setWallet', wallet);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}