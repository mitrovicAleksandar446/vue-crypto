import VueRouter from 'vue-router';
import EmployeeHome from "../components/authorized/employee/EmployeeHome";
import Home from "../components/Home";

const router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/employee',
            name: "employee",
            component: EmployeeHome,
            meta: {authRequired: true, role: 'employee'}
        },
        // {
        //     path: '*',
        //     component: PageNotFound,
        //     meta: { authRequired: false }
        // }
    ]
});

export default router;