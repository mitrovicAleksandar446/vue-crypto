import Contract from './Contract'

class QXContract extends Contract {

    balanceOf(address) {
        return this.contract.methods.balanceOf(address).call();
    }

    transfer(to, tokens) {
        return this.sendSignedTransaction(this.contract.methods.transfer(to, tokens));
    }
}

export default QXContract;
