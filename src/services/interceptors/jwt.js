export default config => {
    config.headers.common["Authorization"] = "Bearer jwt";
    return config;
}