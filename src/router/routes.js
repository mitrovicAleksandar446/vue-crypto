import EmployeeHome from "../components/authorized/employee/EmployeeHome";
import TellerHome from "../components/authorized/teller/TellerHome";
import Login from "../components/unauthorized/login/LoginForm";
import RecoverWallet from "../components/authorized/shared/recoverWallet/RecoverWalletForm";
import Register from "../components/unauthorized/register/RegisterForm";
import InactiveUsers from "../components/authorized/teller/users/InactiveUsers";
import Users from "../components/authorized/teller/users/Users";
import ManagePerks from "../components/authorized/teller/perks/ManagePerks";
import NewPerk from "../components/authorized/teller/perks/NewPerk";
import EditPerk from "../components/authorized/teller/perks/EditPerk";
import ManageAchievements from "../components/authorized/teller/achievements/ManageAchievements";
import NewAchievement from "../components/authorized/teller/achievements/NewAchievement";
import EditAchievement from "../components/authorized/teller/achievements/EditAchievement";
import WalletBalance from "../components/authorized/teller/wallet/WalletBalance";
import RewardRequests from "../components/authorized/teller/requests/RewardRequests";
import RedeemRequests from "../components/authorized/teller/requests/RedeemRequests";
import Error404 from "../components/authorized/shared/errors/Error404";
import Error500 from "../components/authorized/shared/errors/Error500";
import EmployeeWalletBalance from "../components/authorized/employee/wallet/WalletBalance";
import AchievementsList from "../components/authorized/employee/achievements/AchievementsList";
import PerksList from "../components/authorized/employee/perks/PerksList";

import {EMPLOYEE_ID, TELLER_ID} from "../utils/role-types";

function getMeta(isAuthorized, role = null) {
    if (!role) {
        return {authRequired: isAuthorized, role: null};
    }
    return {authRequired: isAuthorized, role: role};
}

function getErrorMeta() {
    return {authRequired: false, error: true};
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
        redirect: { name: 'employeeWalletBalance' },
        component: EmployeeHome,
        meta: getMeta(true, EMPLOYEE_ID),
        children: [
            {
                path: '/request/achievements',
                name: "achievementsList",
                component: AchievementsList,
                meta: getMeta(true, EMPLOYEE_ID)
            },
            {
                path: '/request/perks',
                name: "perksList",
                component: PerksList,
                meta: getMeta(true, EMPLOYEE_ID)
            },
            {
                path: '/recover/my/wallet',
                name: "employeeRecoverWallet",
                component: RecoverWallet,
                meta: getMeta(true, EMPLOYEE_ID)
            },
            {
                path: '/my/wallet',
                name: "employeeWalletBalance",
                component: EmployeeWalletBalance,
                meta: getMeta(true, EMPLOYEE_ID)
            },
        ]
    },
    {
        path: '/teller',
        name: "tellerHome",
        redirect: { name: 'walletBalance' },
        component: TellerHome,
        meta: getMeta(true, TELLER_ID),
        children: [
            {
                path: '/users',
                name: "users",
                component: Users,
                meta: getMeta(true, TELLER_ID)
            },
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
            // Wallet
            {
                path: '/recover-wallet',
                name: "recoverWallet",
                component: RecoverWallet,
                meta: getMeta(true, TELLER_ID)
            },
            {
                path: '/wallet',
                name: "walletBalance",
                component: WalletBalance,
                meta: getMeta(true, TELLER_ID)
            },
            {
                path: '/reward-requests',
                name: "rewardRequests",
                component: RewardRequests,
                meta: getMeta(true, TELLER_ID)
            },
            {
                path: '/redeem-requests',
                name: "redeemRequests",
                component: RedeemRequests,
                meta: getMeta(true, TELLER_ID)
            },
        ]
    },
    {
        path: '*',
        name: "error404",
        component: Error404,
        meta: getErrorMeta()
    },
    {
        path: '*',
        name: "error500",
        component: Error500,
        meta: getErrorMeta()
    }
]
