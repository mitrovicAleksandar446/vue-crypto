'use strict';

import Storage from "../services/Storage";
import {JWT_TOKEN_NAME} from "../config";

export {
    getAccessInfo,
    tokenExists,
    getToken
}

function getAccessInfo() {
    return tokenExists() ? JSON.parse(Storage.getFromLocal(JWT_TOKEN_NAME)) : null;
}

function tokenExists() {
    return Storage.hasInLocal(JWT_TOKEN_NAME);
}

function getToken() {
    const access = getAccessInfo();
    if (access) return access.token;
    return null;
}