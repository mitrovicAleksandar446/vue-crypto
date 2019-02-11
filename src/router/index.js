import Vue from 'vue';
import VueRouter from 'vue-router';
import EmployeeHome from "../components/authorized/employee/EmployeeHome";
import Home from "../components/Home";
import Login from "../components/unauthorized/login/LoginForm";
import Register from "../components/unauthorized/register/RegisterForm";

import { EMPLOYEE } from "@/utils/role-types";

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
            meta: {authRequired: false, role: null}
        },
        {
            path: '/register',
            name: "register",
            component: Register,
            meta: {authRequired: false, role: null}
        },
        {
            path: '/employee',
            name: "employee",
            component: EmployeeHome,
            meta: {authRequired: true, role: EMPLOYEE}
        },
        // {
        //     path: '*',
        //     component: PageNotFound,
        //     meta: { authRequired: false }
        // }
    ]
});

router.beforeEach((to, from, next) => {
    console.log(to);
    next();
});

export default router;