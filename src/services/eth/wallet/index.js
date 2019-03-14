import {ethClient} from "../../ethClient";
import bip39 from 'bip39';
import hdKey from 'ethereumjs-wallet/hdkey';

export default {
    create,
    load,
    save,
    clear
};

function create(mnemonic) {
    const root = hdKey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    const firstWallet = root.derivePath("m/44'/60'/0'/0/0").getWallet();
    const privateKey = firstWallet.getPrivateKeyString();
    const account = ethClient.eth.accounts.privateKeyToAccount(privateKey);

    ethClient.eth.accounts.wallet.add(account);
    return ethClient.eth.accounts.wallet[0];
}

function save(email, password) {
    ethClient.eth.accounts.wallet.save(password, email);
}

function clear() {
    ethClient.eth.accounts.wallet.clear();
}

function load(email, password) {
    return ethClient.eth.accounts.wallet.load(password, email)[0];
}