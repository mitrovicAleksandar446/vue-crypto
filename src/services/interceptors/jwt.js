import {getToken} from './../../utils/helpers'

export default {
    success: config => {
        const token = getToken();
        if (token) {
            config.headers.common["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    error: error => {
        return Promise.reject(error);
    }
};