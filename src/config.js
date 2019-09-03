/** @namespace process.env.VUE_APP_BASE_API_URL */
export const API_ROOT = process.env.VUE_APP_BASE_API_URL || "http://api.quantox-coin.com/api";

/** @namespace process.env.VUE_APP_JWT_QXC_TOKEN */
export const JWT_TOKEN_NAME = process.env.VUE_APP_JWT_QXC_TOKEN || "qxc-token";

/** @namespace process.env.VUE_APP_ETH_PROVIDER_HOST */
export const ETH_PROVIDER_HOST = process.env.VUE_APP_ETH_PROVIDER_HOST || "http://127.0.0.1";

/** @namespace process.env.VUE_APP_ETH_PROVIDER_PORT */
export const ETH_PROVIDER_PORT = process.env.VUE_APP_ETH_PROVIDER_PORT || 7545;

/** @namespace process.env.VUE_APP_CONTRACT_GAS_PRICE */
export const CONTRACT_GAS_PRICE = process.env.VUE_APP_CONTRACT_GAS_PRICE || '20000000000'; // 20 gwei

/** @namespace process.env.VUE_APP_CONTRACT_GAS */
export const CONTRACT_GAS = process.env.VUE_APP_CONTRACT_GAS || '2000000';

/** @namespace process.env.VUE_APP_QXC_WALLET */
export const QXC_WALLET = process.env.VUE_APP_QXC_WALLET || 'qxc-wallet';

/** @namespace process.env.VUE_APP_ETH_NETWORK_ID */
export const NETWORK_ID = process.env.VUE_APP_ETH_NETWORK_ID || 5777;
