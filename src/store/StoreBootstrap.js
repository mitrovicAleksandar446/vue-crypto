import store from '.'
import bootableActions from './bootableActions'
import {tokenExists} from "../utils/helpers";

class StoreBootstrap {

    constructor(store, actions) {
        this.store = store;
        this.bootableActions = actions;
    }

    bootActions() {

        let chain = this.bootableActions.reduce((prev, curr) => {
            if (this.actionCanBeExecuted(curr)) {
                return this.store.dispatch(prev.action)
                    .then(() => this.store.dispatch(curr.action));
            }
        });
        if (!chain) chain = Promise.resolve();
        return chain;
    }

    actionCanBeExecuted(bootAction) {
        return !bootAction.authorized || (bootAction.authorized && tokenExists());
    }

    boot(action) {
        return this.store.dispatch(action);
    }
}

export default new StoreBootstrap(store, bootableActions);