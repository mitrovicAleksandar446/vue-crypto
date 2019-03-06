export default {
    success: response => {
        return response;
    },
    error: error => {
        window.console.error(`${error} => ${(new Date()).toLocaleTimeString()}`);
        return Promise.reject(error);
    }
};