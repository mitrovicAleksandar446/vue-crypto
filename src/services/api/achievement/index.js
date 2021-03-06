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
    getMyAchievements,
}

function create(perk) {
    return http.post(`/achievements`, perk);
}

function getAll() {
    return http.get(`/achievements`)
        .then(responseTransformer);
}

function destroy(achievementId) {
    return http.delete(`/achievements/${achievementId}`);
}

function get(achievementId) {
    return http.get(`/achievements/${achievementId}`)
        .then(responseTransformer);
}

function update(achievement, achievementId) {
    return http.patch(`/achievements/${achievementId}`, achievement);
}

function getRequests(status) {
    return http.get(`/user-achievements`, {params: {status}})
        .then(responseTransformer);
}

function updateRequest(request, id) {
    return http.patch(`/user-achievements/${id}`, request);
}

function createRequest(request, id) {
    return http.post(`/my/achievements/${id}`, request);
}

function getMyAchievements(status) {
    return http.get(`/my/achievements`, {params: {status}})
        .then(responseTransformer);
}
