import axios from 'axios'
import interceptors from "./interceptors/"
import {API_ROOT} from "../config";

const http = axios.create({
    baseURL: API_ROOT
});

const responseTransformer = response => response.data;

interceptors.requests.forEach((interceptor) => {
    http.interceptors.request.use(interceptor);
});

interceptors.responses.forEach((interceptor) => {
    http.interceptors.response.use(interceptor);
});

export {
    http,
    responseTransformer
};
