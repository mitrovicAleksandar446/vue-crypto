export default {
    success: config => {
        config.headers.common["X-Micko"] = "Aca";
        return config;
    },
    error: error => {
        return Promise.reject(error);
    }
};