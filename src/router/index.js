import Vue from 'vue';
import VueRouter from 'vue-router';
import EmployeeHome from "../components/authorized/employee/EmployeeHome";
import Home from "../components/Home";
import Login from "../components/unauthorized/login/LoginForm";
import Register from "../components/unauthorized/register/RegisterForm";

import {EMPLOYEE_ID} from "../utils/role-types";
import {TELLER_ID} from "../utils/role-types";
import {getAccessInfo} from "../utils/helpers";

import store from './../store/'

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/login',
            name: "login",
            component: Login,
            meta: getMeta(false)
        },
        {
            path: '/register',
            name: "register",
            component: Register,
            meta: getMeta(false)
        },
        {
            path: '/employee',
            name: "employeeHome",
            component: EmployeeHome,
            meta: getMeta(true, EMPLOYEE_ID)
        },
        {
            path: '/teller',
            name: "tellerHome",
            component: EmployeeHome,
            meta: getMeta(true, TELLER_ID)
        },
        // {
        //     path: '*',
        //     component: PageNotFound,
        //     meta: { authRequired: false }
        // }
    ]
});

function getMeta(isAuthorized, role = null) {
    if (!role) {
        return {authRequired: isAuthorized, role: null};
    }
    return {authRequired: isAuthorized, role: role};
}

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
                next(false);
            }
        } else {
            next({name: 'login'});
        }
    } else {
        next();
    }
});

export default router;