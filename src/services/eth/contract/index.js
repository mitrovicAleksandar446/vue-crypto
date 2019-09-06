import QXContract from './QXContract';
import {CONTRACT_GAS_PRICE} from '../../../config';
import {ethClient} from '../../ethClient';
import store from '@/store/';

let qxcContract = null;

async function create() {

    if (!store.state.contract.contractAddress) {
        await store.dispatch("contract/getContract");
    }
    const contract = store.state.contract;

    const qxcRawContract = new ethClient.eth.Contract(contract.contractAbi, contract.contractAddress, {gasPrice: CONTRACT_GAS_PRICE});
    return new QXContract(qxcRawContract);
}

async function getInstance() {
    if (!store.state.wallet.wallet) throw new Error("Wallet is not loaded");
    return qxcContract ? qxcContract : await create();
}

export default {
    getInstance
}
