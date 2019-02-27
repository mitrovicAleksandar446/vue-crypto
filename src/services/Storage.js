'use strict';

class Storage {
    
    constructor() {
        this.localStorage = window.localStorage;
        this.sessionStorage = window.sessionStorage;
    }
    
    get(id) {
        let result = this.getFromSession(id);
        if (!result) {
            result = this.getFromLocal(id);
        }
        return result;
    }

    getFromLocal(id) {
        return this.localStorage.getItem(id);
    }

    getFromSession(id) {
        return this.sessionStorage.getItem(id);
    }

    has(id) {
        return this.hasInLocal(id) || this.hasInSession(id);
    }

    hasInLocal(id) {
        return this.getFromLocal(id) !== null;
    }

    hasInSession(id) {
        return this.getFromSession(id) !== null;
    }

    putInLocal(id, value) {
        this.localStorage.setItem(id, value);
        return true;
    }

    putInSession(id, value) {
        this.sessionStorage.setItem(id, value);
        return true;
    }
    
    destroyLocal(id) {
        this.localStorage.removeItem(id);
        return true;
    }

    destroySession(id) {
        this.sessionStorage.removeItem(id);
        return true;
    }

    destroy(id) {
        return this.destroySession(id) && this.destroyLocal(id);
    }

    destroyAll(ids) {
        if (Array.isArray(ids) && ids.length > 0) {
            for (const key of ids) {
                this.destroy(key);
            }
        }
        return true;
    }

    flushLocal() {
        this.localStorage.clear();
        return true;
    }

    flushSession() {
        this.sessionStorage.clear();
        return true;
    }

    flush() {
        return this.flushLocal() && this.flushSession();
    }
}

export default new Storage;