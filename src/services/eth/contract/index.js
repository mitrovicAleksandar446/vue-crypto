import QXContract from './QXContract';
import contractApi from '../../api/contract';
import store from '../../../store';
import {CONTRACT_GAS_PRICE} from '../../../config';
import {ethClient} from '../../ethClient';

let qxcContract = null;

async function create() {

    const contract = await contractApi.getContract();
    const user = store.state.user.authUser;
    if (!user) {
        throw new Error("Can't create contract, user is unknown");
    }
    const options = {
        from: user.address,
        gasPrice: CONTRACT_GAS_PRICE
    };
    const abi = JSON.parse(contract.abi);

    const qxcRawContract = new ethClient.eth.Contract(abi, contract.address, options);
    return new QXContract(qxcRawContract);
}

async function getInstance() {
    if (qxcContract) return qxcContract;
    else return qxcContract = await create();
}

export default {
    getInstance
}