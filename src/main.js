import Vue from 'vue';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import Buefy from 'buefy';
import router from './router';
import store from './store';
import StoreBootstrap from './store/StoreBootstrap'

import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false;

Vue.use(Buefy,  {
    defaultIconPack: 'fa'
});
Vue.use(VeeValidate);

StoreBootstrap.bootActions()
    .then(() => {
        new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app');
    });


