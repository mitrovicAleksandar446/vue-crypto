'use strict';

import store from './../store'
import router from './../router'

export {
    handleUnauthenticatedHandler,
    handleNotFoundHandler
}

function handleUnauthenticatedHandler() {
    store.dispatch('user/signOut')
        .then(() => router.push({name: 'login'}));

}

function handleNotFoundHandler() {
    router.push({name: 'login'});
}

