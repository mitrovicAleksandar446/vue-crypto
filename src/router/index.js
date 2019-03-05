import Vue from 'vue';
import VueRouter from 'vue-router';
import {getAccessInfo} from "../utils/helpers";
import store from './../store/'
import routes from './routes'

Vue.use(VueRouter);

const router = new VueRouter({routes});

function tokenDidntExpire(expireDate) {
    return expireDate > new Date;
}

function routeRequiresToBeAuthorized(route) {
    return route.meta.authRequired;
}

function routeMatchesUserRole(route, roles) {
    if (!roles) return false;
    return !route.meta.role || roles.includes(route.meta.role);
}

router.beforeEach(async (to, from, next) => {
    const access = getAccessInfo();

    if (routeRequiresToBeAuthorized(to)) {
        if (access && tokenDidntExpire(access.expireDate)) {
            const userRoles = store.getters["user/userRoles"];
            if (routeMatchesUserRole(to, userRoles)) {
                next();
            } else {
                next({name: from.name});
            }
        } else {
            next({name: 'login'});
        }
    } else {
        next();
    }
});

export default router;