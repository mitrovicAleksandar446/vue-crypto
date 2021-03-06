import {
    http,
    responseTransformer
} from './../../http'

export default {
    create,
    getAll,
    destroy,
    get,
    update,
    getRequests,
    updateRequest,
    createRequest,
    getMyPerks,
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

function getRequests(status) {
    return http.get(`/user-perks`, {params: {status}})
        .then(responseTransformer);
}

function updateRequest(request, id) {
    return http.patch(`/user-perks/${id}`, request);
}
function createRequest(request, id) {
    return http.post(`/my/perks/${id}`, request);
}

function getMyPerks(status) {
    return http.get(`/my/perks`, {params: {status}})
        .then(responseTransformer);
}
