import {
    http,
    responseTransformer
} from './../../http'

export default {
    getContract
}

function getContract() {
    return http.get(`/contract`)
        .then(responseTransformer);
}




