import {ethClient} from "../../ethClient";
import bip39 from 'bip39';

export default {
    create
};

function create(mnemonic, password, email) {
    const wallet = ethClient.eth.accounts.wallet.create(1, bip39.mnemonicToSeedHex(mnemonic))[0];
    ethClient.eth.accounts.wallet.save(password, email);
    return wallet;
}