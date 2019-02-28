import Vue from 'vue';
import VueRouter from 'vue-router';
import EmployeeHome from "../components/authorized/employee/EmployeeHome";
import Home from "../components/Home";
import Login from "../components/unauthorized/login/LoginForm";
import Register from "../components/unauthorized/register/RegisterForm";

import {EMPLOYEE_ID} from "../utils/role-types";
import {TELLER_ID} from "../utils/role-types";
import {getAccessInfo} from "../utils/helpers";

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
            meta: getMetaFor(null)
        },
        {
            path: '/register',
            name: "register",
            component: Register,
            meta: getMetaFor(null)
        },
        {
            path: '/employee',
            name: "employeeHome",
            component: EmployeeHome,
            meta: getMetaFor(EMPLOYEE_ID)
        },
        {
            path: '/teller',
            name: "tellerHome",
            component: EmployeeHome,
            meta: getMetaFor(TELLER_ID)
        },
        // {
        //     path: '*',
        //     component: PageNotFound,
        //     meta: { authRequired: false }
        // }
    ]
});

function getMetaFor(role) {
    if (!role) {
        return {authRequired: false, role: null};
    }
    return {authRequired: true, role: role};
}

function tokenDidntExpire(expireDate) {
    return expireDate > new Date;
}

function routeRequiresToBeAuthorized(route) {
    return route.meta.authRequired;
}

router.beforeEach((to, from, next) => {
    const access = getAccessInfo();
    if (routeRequiresToBeAuthorized(to) && tokenDidntExpire(access.expireDate)) {

    } else {

    }
    console.log(to);
    next();
});

export default router;