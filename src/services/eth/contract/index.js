import {ethClient} from "../../ethClient";
import {CONTRACT_GAS_PRICE} from "./../../../config";

export default {
    create
};

function create(abi, address, from) {
    return new ethClient.eth.Contract(abi, address, {
        from: from,
        gasPrice: CONTRACT_GAS_PRICE
    });
}