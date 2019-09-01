import {EventBus} from "../eventBus";

const is = function (type) {
   return this.message.includes(type.toString());
};

export default {
    success: response => {
        return response;
    },
    error: error => {

        error.is = is;
        if (error.is(401)) {
            EventBus.$emit('i-got-401-error', error);
        }
        return Promise.reject(error);
    }
};
