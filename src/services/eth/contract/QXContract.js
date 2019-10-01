import Contract from './Contract'
import {CONTRACT_DECIMALS} from '@/config'

class QXContract extends Contract {

	balanceOf(address) {
		return this.contract.methods.balanceOf(address).call()
			.then((tokens) => this.divide(tokens));
	}

	transfer(to, tokens) {
		const multipliedTokens = this.multiply(tokens);
		return this.sendSignedTransaction(this.contract.methods.transfer(to, multipliedTokens));
	}

	multiply(tokens) {
		return tokens * Math.pow(10, CONTRACT_DECIMALS);
	}

	divide(tokens) {
		return tokens / Math.pow(10, CONTRACT_DECIMALS);
	}
}

export default QXContract;
