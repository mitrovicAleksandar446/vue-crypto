'use strict';

import Storage from "../services/Storage";
import {API_ROOT, JWT_TOKEN_NAME} from "../config";

export {
    getAccessInfo,
    tokenExists,
    getToken,
    isTokenValid,
    removeToken,
    filesystem
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

function isTokenValid() {
    const access = getAccessInfo();
    if (!access) return false;
    return access.token && access.expireDate > new Date;
}

function removeToken() {
    Storage.destroyLocal(JWT_TOKEN_NAME);
}

function filesystem(path) {
    if (!path) return path;
    const validatedPath = path[0] === "/" ? path : `/${path}`;
    return `${API_ROOT}/filesystem${validatedPath}`;
}