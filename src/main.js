import Vue from 'vue'
import App from './App.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Buefy from 'buefy'
import VueRouter from 'vue-router'

import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

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


Vue.use(Buefy)
Vue.use(VueRouter)

new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')
