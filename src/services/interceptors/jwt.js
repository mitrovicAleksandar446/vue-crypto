export default {
    success: config => {
        config.headers.common["Authorization"] = "Bearer jwt";
        return config;
    },
    error: error => {
        return Promise.reject(error);
    }
};