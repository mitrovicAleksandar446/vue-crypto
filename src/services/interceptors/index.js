import jwt from './jwt'
import errorLogger from './errorLogger'
import errorEmitter from './errorEmitter'

export default {
    requests: [
        jwt
    ],
    responses: [
        errorLogger,
        errorEmitter
    ]
}