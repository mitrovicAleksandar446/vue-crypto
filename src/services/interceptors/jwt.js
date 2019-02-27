import {JWT_TOKEN_NAME} from './../../config'
import Storage from './../Storage'

export default {
    success: config => {
        const token = Storage.hasInLocal(JWT_TOKEN_NAME) ? Storage.getFromLocal(JWT_TOKEN_NAME) : null;
        if (token) {
            config.headers.common["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    error: error => {
        return Promise.reject(error);
    }
};