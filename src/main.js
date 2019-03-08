import Vue from 'vue';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import Buefy from 'buefy';
import router from './router';
import store from './store';
import StoreBootstrap from './store/StoreBootstrap'
import {EventBus} from "./services/eventBus";
import {handleUnauthenticatedHandler, handleNotFoundHandler} from './errorHandlers/handlers';

import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false;

Vue.use(Buefy,  {defaultIconPack: 'fa'});
Vue.use(VeeValidate);

EventBus.$on('i-got-401-error', handleUnauthenticatedHandler);
EventBus.$on('i-got-404-error', handleNotFoundHandler);

StoreBootstrap.bootActions()
    .then(() => {
        new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app');
    });


