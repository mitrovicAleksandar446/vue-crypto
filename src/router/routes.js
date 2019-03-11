import EmployeeHome from "../components/authorized/employee/EmployeeHome";
import TellerHome from "../components/authorized/teller/TellerHome";
import Login from "../components/unauthorized/login/LoginForm";
import Register from "../components/unauthorized/register/RegisterForm";
import InactiveUsers from "../components/authorized/teller/users/InactiveUsers";
import ManagePerks from "../components/authorized/teller/perks/ManagePerks";
import NewPerk from "../components/authorized/teller/perks/NewPerk";
import EditPerk from "../components/authorized/teller/perks/EditPerk";
import ManageAchievements from "../components/authorized/teller/achievements/ManageAchievements";
import NewAchievement from "../components/authorized/teller/achievements/NewAchievement";
import EditAchievement from "../components/authorized/teller/achievements/EditAchievement";

import {EMPLOYEE_ID, TELLER_ID} from "../utils/role-types";

function getMeta(isAuthorized, role = null) {
    if (!role) {
        return {authRequired: isAuthorized, role: null};
    }
    return {authRequired: isAuthorized, role: role};
}

export default [

    {
        path: '/',
        redirect: { name: 'login' }
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
            },
            // Perks
            {
                path: '/perks',
                name: "perks",
                component: ManagePerks,
                meta: getMeta(true, TELLER_ID)
            },
            {
                path: '/new-perk',
                name: "newPerk",
                component: NewPerk,
                meta: getMeta(true, TELLER_ID)
            },
            {
                path: '/perks/:id',
                name: "editPerk",
                component: EditPerk,
                meta: getMeta(true, TELLER_ID)
            },
            // Achievements
            {
                path: '/achievements',
                name: "achievements",
                component: ManageAchievements,
                meta: getMeta(true, TELLER_ID)
            },
            {
                path: '/new-achievement',
                name: "newAchievement",
                component: NewAchievement,
                meta: getMeta(true, TELLER_ID)
            },
            {
                path: '/achievements/:id',
                name: "editAchievement",
                component: EditAchievement,
                meta: getMeta(true, TELLER_ID)
            },
        ]
    },
    // {
    //     path: '*',
    //     component: PageNotFound,
    //     meta: { authRequired: false }
    // }

]