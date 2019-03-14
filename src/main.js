import Vue from 'vue';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import Buefy from 'buefy';
import router from './router';
import store from './store';
import {EventBus} from "./services/eventBus";
import {unauthenticatedUserHandler, notFoundHandler} from './handlers/errorHandlers/';
import {sessionStoragePersistenceHandler, triggerSessionStoragePersistence} from './handlers/sessionStoragePersistenceHandler/';

import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false;

Vue.use(Buefy,  {defaultIconPack: 'fa'});
Vue.use(VeeValidate);

triggerSessionStoragePersistence();

window.addEventListener("storage", sessionStoragePersistenceHandler);
EventBus.$on('i-got-401-error', unauthenticatedUserHandler);
EventBus.$on('i-got-404-error', notFoundHandler);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


