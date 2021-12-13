// export * from './state.sevice';

import { BehaviorSubject } from 'rxjs';

var localState = {
    masterData: {}
}

var sessionState = {
    default: {}
}

var localStateManager = new BehaviorSubject(localState); // Local storage
var sessionStateManager = new BehaviorSubject(sessionState); // Session storage

if (localStorage.hasOwnProperty('localState')) {
    localStateManager.next(JSON.parse(localStorage.getItem('localState')));
}
localStateManager.subscribe(updatedData => {
    localState = updatedData;
    localStorage.setItem('localState', JSON.stringify(localState));
})

if (sessionStorage.hasOwnProperty('sessionState')) {
    sessionStateManager.next(JSON.parse(sessionStorage.getItem('sessionState')));
}

sessionStateManager.subscribe(updatedState => {
    sessionState = updatedState;
    sessionStorage.setItem('sessionState', JSON.stringify(sessionState));
})

module.exports = localState;
module.exports = sessionState;

module.exports = localStateManager;
module.exports = sessionStateManager;

localState.next(initialLocalState.test = 'hello');
localStateManager()
