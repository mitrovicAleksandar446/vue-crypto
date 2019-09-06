import {CONTRACT_GAS, NETWORK_ID} from '@/config';
import store from '@/store/';
import {ethClient} from '../../ethClient';

class Contract {

    contract = null;

    constructor(contract) {
        this.contract = contract;
    }

    sendSignedTransaction(query) {

        const privateKey = store.state.wallet.wallet.privateKey;
        const from = store.state.wallet.wallet.address;
        const tx = {
            from,
            to: this.contract.options.address,
            gas: CONTRACT_GAS,
            data: query.encodeABI(),
            chainId: NETWORK_ID,
        };

        return ethClient.eth.accounts.signTransaction(tx, privateKey).then(
            signed => new Promise((resolve, reject) => {

                ethClient.eth
                    .sendSignedTransaction(signed.rawTransaction)
                    .once('confirmation', (confirmationNumber, receipt) => {

                        if (receipt.status === '0x0') reject(receipt);
                        else resolve(true);
                    })
                    .once('error', error => {
                        reject(error);
                    });
            })
        );
    }
}

export default Contract;
