import {removeToken} from "../../utils/helpers";
import router from './../../router'

export default {
    success: response => {
        return response;
    },
    error: error => {
        if (error.message.indexOf("401") !== -1) {
            removeToken();
            router.replace({name: "login"});
        }
        return Promise.reject(error);
    }
};