import EmployeeHome from "../components/authorized/employee/EmployeeHome";
import TellerHome from "../components/authorized/teller/TellerHome";
import Home from "../components/Home";
import Login from "../components/unauthorized/login/LoginForm";
import Register from "../components/unauthorized/register/RegisterForm";
import InactiveUsers from "../components/authorized/teller/users/InactiveUsers";

import {EMPLOYEE_ID, TELLER_ID} from "../utils/role-types";

function getMeta(isAuthorized, role = null) {
    if (!role) {
        return {authRequired: isAuthorized, role: null};
    }
    return {authRequired: isAuthorized, role: role};
}

export default [

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
        component: TellerHome,
        meta: getMeta(true, TELLER_ID),
        children: [
            {
                path: '/inactive-users',
                name: "inactiveUsers",
                component: InactiveUsers,
                meta: getMeta(true, TELLER_ID)
            }
        ]
    },
    // {
    //     path: '*',
    //     component: PageNotFound,
    //     meta: { authRequired: false }
    // }

]