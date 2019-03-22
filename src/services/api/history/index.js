import {
    http,
    responseTransformer
} from './../../http'

export default {
    getAll
}

function getAll() {
    return http.get(`/history`)
        .then(responseTransformer);
}