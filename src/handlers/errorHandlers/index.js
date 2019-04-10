'use strict';

import store from './../../store'
import router from './../../router'

export {
    unauthenticatedUserHandler,
    notFoundHandler,
    serverErrorHandler
}

function unauthenticatedUserHandler() {
    store.dispatch('user/signOut')
        .then(() => router.push({name: 'login'}));
}

function notFoundHandler() {
    router.push({name: 'error404'});
}

function serverErrorHandler() {
    router.push({name: 'error500'});
}

