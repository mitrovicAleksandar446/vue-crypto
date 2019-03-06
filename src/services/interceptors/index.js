import jwt from './jwt'
import errorLogger from './errorLogger'
import redirectUnauthenticated from './redirectUnauthenticated'

export default {
    requests: [
        jwt
    ],
    responses: [
        errorLogger,
        redirectUnauthenticated,
    ]
}