import {getToken, isTokenValid} from './../../utils/helpers'

export default {
    success: config => {
        if (isTokenValid()) {
            const token = getToken();
            config.headers.common["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    error: error => {
        return Promise.reject(error);
    }
};