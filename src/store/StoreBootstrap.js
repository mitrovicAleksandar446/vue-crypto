import store from '.'
import bootActions from './bootableActions'
import {tokenExists} from "../utils/helpers";

class StoreBootstrap {

    constructor(store, actions) {
        this.store = store;
        this.bootableActions = actions;
    }

    bootActions() {
        this.bootableActions.forEach(async (boot) => {
            if (!boot.authorized || (boot.authorized && tokenExists())) {
                await this.store.dispatch(boot.action);
            }
        });
    }

    boot(action) {
        return this.store.dispatch(action);
    }
}

export default new StoreBootstrap(store, bootActions);