import Storage from './../../services/Storage'

const sessionStoragePersistenceHandler = e => {

    if (e.key === 'getSessionStorage') {
        // Some tab asked for the sessionStorage -> send it
        Storage.putInLocal('sessionStorage', JSON.stringify(sessionStorage));
        Storage.destroyLocal('sessionStorage');

    } else if (e.key === 'sessionStorage' && Storage.sessionEmpty()) {
        // sessionStorage is empty -> fill it
        const data = JSON.parse(e.newValue);
        for (const key in data) {
            Storage.putInSession(key, data[key]);
        }
    }
};

const triggerSessionStoragePersistence = () => {
    if (Storage.sessionEmpty()) {
        Storage.putInLocal('getSessionStorage', new Date);
    }
};

export {
    sessionStoragePersistenceHandler,
    triggerSessionStoragePersistence
};