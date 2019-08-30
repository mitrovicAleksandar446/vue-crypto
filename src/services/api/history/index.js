import {
    http,
    responseTransformer
} from './../../http'

export default {
    getAll,
    getMyHistory
}

function getAll() {
    return http.get(`/history`)
        .then(responseTransformer);
}

function getMyHistory() {
    return http.get(`/my/history`)
        .then(responseTransformer);
}