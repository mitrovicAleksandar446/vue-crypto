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
