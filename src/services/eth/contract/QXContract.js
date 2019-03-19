
class QXContract {

    constructor(contract) {
        this.contract = contract;
    }

    totalSupply() {
        return this.contract.methods.totalSupply().call();
    }

    balanceOf(address) {
        return this.contract.methods.balanceOf(address).call();
    }
}

export default QXContract;