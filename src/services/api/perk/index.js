import {
    http,
    responseTransformer
} from './../../http'

export default {
    create,
    getAll,
    destroy,
    get,
    update
}

function create(perk) {
    return http.post(`/perks`, perk);
}

function getAll() {
    return http.get(`/perks`)
        .then(responseTransformer);
}

function destroy(perkId) {
    return http.delete(`/perks/${perkId}`);
}

function get(perkId) {
    return http.get(`/perks/${perkId}`)
        .then(responseTransformer);
}

function update(perk, perkId) {
    return http.post(`/perks/${perkId}`, perk);
}
