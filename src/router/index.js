import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "../components/Login";
import Home from "../components/Home";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: {
                name: "login"
            }
        },
        {
            path: '/login',
            name: "login",
            component: Login
        },
        {
            path: '/home',
            name: "home",
            component: Home
        }
    ]
});

export default router;