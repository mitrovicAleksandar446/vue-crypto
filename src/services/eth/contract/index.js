import QXContract from './QXContract';
import {CONTRACT_GAS_PRICE} from '../../../config';
import {ethClient} from '../../ethClient';
import store from '@/store/';

let qxcContract = null;

async function create(address) {

    const contract = store.state.contract;
    const options = {
        from: address,
        gasPrice: CONTRACT_GAS_PRICE
    };

    const qxcRawContract = new ethClient.eth.Contract(contract.contractAbi, contract.contractAddress, options);
    return new QXContract(qxcRawContract);
}

async function getInstance(address) {
    if (qxcContract) {
        qxcContract.contract.options.from = address;
        return qxcContract;
    }
    else return qxcContract = await create(address);
}

export default {
    getInstance
}