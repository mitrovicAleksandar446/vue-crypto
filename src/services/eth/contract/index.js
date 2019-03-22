import QXContract from './QXContract';
import contractApi from '../../api/contract';
import {CONTRACT_GAS_PRICE} from '../../../config';
import {ethClient} from '../../ethClient';

let qxcContract = null;

async function create(address) {

    const contract = await contractApi.getContract();
    const options = {
        from: address,
        gasPrice: CONTRACT_GAS_PRICE
    };
    const abi = JSON.parse(contract.abi);

    const qxcRawContract = new ethClient.eth.Contract(abi, contract.address, options);
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