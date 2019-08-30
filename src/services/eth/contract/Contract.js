const sendSignedTransaction = Symbol("sendSignedTransaction");

class Contract {

    constructor(contract) {
        this.contract = contract;
    }

    [sendSignedTransaction](method) {

    }
}

export default Contract;
