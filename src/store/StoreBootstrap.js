import store from '.'
import bootableActions from './bootableActions'
import {tokenExists} from "../utils/helpers";

class StoreBootstrap {

    constructor(store, actions) {
        this.store = store;
        this.bootableActions = actions;
    }

    async bootActions() {

        for (const boot of this.bootableActions) {
            if (this.actionCanBeExecuted(boot)) {

                if (boot.hasDependence) {
                    await this.store.dispatch(boot.action);
                } else {
                    this.store.dispatch(boot.action);
                }
            }
        }
    }

    actionCanBeExecuted(bootAction) {
        return !bootAction.authorized || (bootAction.authorized && tokenExists());
    }

    boot(action) {
        return this.store.dispatch(action);
    }
}

export default new StoreBootstrap(store, bootableActions);