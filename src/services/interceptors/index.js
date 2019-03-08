import jwt from './jwt'
import errorLogger from './errorLogger'

export default {
    requests: [
        jwt
    ],
    responses: [
        errorLogger
    ]
}