'use strict';

import Storage from "../services/Storage";
import {JWT_TOKEN_NAME} from "../config";

export {
    getAccessInfo,
    getToken
}

function getAccessInfo() {
    return Storage.hasInLocal(JWT_TOKEN_NAME) ? JSON.parse(Storage.getFromLocal(JWT_TOKEN_NAME)) : null;
}

function getToken() {
    const access = getAccessInfo();
    if (access) return access.token;
    return null;
}