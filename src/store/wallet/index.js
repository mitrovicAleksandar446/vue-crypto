'use strict';

import bip39 from 'bip39';
import ethWallet from './../../services/eth/wallet';
import Storage from './../../services/Storage'
import {QXC_WALLET} from './../../config'

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
        ethWallet.save(userData.email, userData.password);
        commit('setWallet', wallet);
    },

    async recoverWallet({commit, rootState}, payload) {
        const wallet = ethWallet.create(payload.mnemonic, payload.password, payload.email);
        if (!wallet || wallet.address !== rootState.user.authUser.address) {
            throw new Error("Invalid mnemonic");
        }
        commit('setWallet', wallet);
        Storage.putInSession(QXC_WALLET, JSON.stringify(wallet));
        ethWallet.save(payload.email, payload.password);
    },

    loadWallet({commit}, userData) {
        const wallet = ethWallet.load(userData.email, userData.password);
        commit('setWallet', wallet);
        if (wallet) {
            Storage.putInSession(QXC_WALLET, JSON.stringify(wallet));
        }
    },

    readWallet({commit}) {
        const wallet = JSON.parse(Storage.getFromSession(QXC_WALLET));
        commit('setWallet', wallet);
    },

    clearWallet({commit}) {
        Storage.destroySession(QXC_WALLET);
        commit('setWallet', null);
        ethWallet.clear();
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
