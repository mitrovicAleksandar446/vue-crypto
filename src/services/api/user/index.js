import {http} from './../../http'

export default {
    signUp,
    emailExist
}

function signUp(user) {
    return http.post(`/users`, user);
}

function emailExist(email) {
    return http.get(`/users/emails/${email}`)
        .then(resonse => resonse.status !== 200)
        .catch(() => true);
}


