import {
    http,
    responseTransformer
} from './../../http'

export default {
    signUp,
    emailExist,
    signIn,
    signOut,
    getUser,
    getInactiveUsers,
    activateUser
}

function signUp(user) {
    return http.post(`/users`, user);
}

function signIn(email, password) {
    return http.post(`/auth/login`, {email, password})
        .then(responseTransformer)
}

function signOut() {
    return http.post(`/auth/logout`);
}

function emailExist(email) {
    return http.get(`/users/emails/${email}`)
        .then(resonse => resonse.status !== 200)
        .catch(() => true);
}

function getUser() {
    return http.get(`/auth/me`)
        .then(responseTransformer);
}

function getInactiveUsers() {
    return http.get(`/users`, {params: {active: false}})
        .then(responseTransformer);
}

function activateUser(id) {
    return http.patch(`/users/${id}`, {active: true});
}