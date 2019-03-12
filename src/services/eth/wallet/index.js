import {ethClient} from "../../ethClient";
import bip39 from 'bip39';
const hdKey = require('ethereumjs-wallet/hdkey');

export default {
    create,
    load
};

function create(mnemonic, password, email) {
    const root = hdKey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    const firstWallet = root.derivePath("m/44'/60'/0'/0/0").getWallet();
    const privateKey = firstWallet.getPrivateKeyString();
    const account = ethClient.eth.accounts.privateKeyToAccount(privateKey);

    ethClient.eth.accounts.wallet.add(account);
    ethClient.eth.accounts.wallet.save(password, email);

    return ethClient.eth.accounts.wallet;
}

function load(email, password) {
    return ethClient.eth.accounts.wallet.load(password, email)[0];
}