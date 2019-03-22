
class QXContract {

    constructor(contract) {
        this.contract = contract;
    }

    balanceOf(address) {
        return this.contract.methods.balanceOf(address).call();
    }
}

export default QXContract;