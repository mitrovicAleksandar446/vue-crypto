import {
    http,
    responseTransformer
} from './../../http'

export default {
    create,
    getAll
}

function create(perk) {
    return http.post(`/perks`, perk);
}

function getAll() {
    return http.get(`/perks`)
        .then(responseTransformer);
}
