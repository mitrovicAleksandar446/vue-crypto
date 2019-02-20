import Web3 from 'web3';
import {ETH_PROVIDER_HOST, ETH_PROVIDER_PORT} from './../config'

const providerConnectionString = `${ETH_PROVIDER_HOST}:${ETH_PROVIDER_PORT}`;
const ethClient = new Web3(providerConnectionString);

export  {
    ethClient
};