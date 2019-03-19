import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './../store/'
import routes from './routes'
import {isTokenValid} from "../utils/helpers";
import {TELLER_ID} from "../utils/role-types";

Vue.use(VueRouter);

const router = new VueRouter({routes});

function routeRequiresToBeAuthorized(route) {
    return route.meta.authRequired;
}

function routeMatchesUserRole(route, roles) {
    if (!roles) return false;
    return !route.meta.role || roles.includes(route.meta.role);
}

async function redirectToHomePage(next) {
    const roles = await getUserRoles();
    if (roles.includes(TELLER_ID)) {
        next({name: 'tellerHome'});
    } else {
        next({name: 'employeeHome'});
    }
}

async function getUserRoles() {
    if (!store.state.user.authUser) {
        await store.dispatch("user/getUser");
    }
    return store.getters["user/userRoles"];
}

router.beforeEach(async (to, from, next) => {

    if (routeRequiresToBeAuthorized(to)) {
        if (isTokenValid()) {
            const userRoles = await getUserRoles();
            if (routeMatchesUserRole(to, userRoles)) {
                next();
            } else {
                next({name: from.name});
            }
        } else {
            next({name: 'login'});
            store.dispatch('user/signOut');
        }
    } else {
        if (isTokenValid()) {
            redirectToHomePage(next);
        } else {
            next();
        }
    }
});

export default router;