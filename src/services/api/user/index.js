import {
    http,
    responseTransformer
} from './../../http'

export default {
    signUp,
    emailExist,
    signIn,
    getUser
}

function signUp(user) {
    return http.post(`/users`, user);
}

function signIn(email, password) {
    return http.post(`/auth/login`, {email, password})
        .then(responseTransformer)
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


