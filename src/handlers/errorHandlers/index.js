'use strict';

import store from './../../store'
import router from './../../router'

export {
    unauthenticatedUserHandler,
    notFoundHandler
}

function unauthenticatedUserHandler() {
    store.dispatch('user/signOut')
        .then(() => router.push({name: 'login'}));

}

function notFoundHandler() {
    router.push({name: 'login'});
}

