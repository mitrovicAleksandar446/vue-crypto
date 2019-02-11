import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Buefy from 'buefy';
import router from './router';

import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(VueRouter);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
