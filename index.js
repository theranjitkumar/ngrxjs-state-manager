// export * from './state.sevice';

import { BehaviorSubject } from 'rxjs';

// Local storage
var initialLocalState = {
    masterData: {}
}

// Session storage
var initialSessionState = {
    default: {}
}

var localState = new BehaviorSubject < any > (this.initialLocalState); // Local storage
var sessionState = new BehaviorSubject < any > (this.initialSessionState); // Session storage

// Browser local storage
module.exports = function localStateManager() {
    if (localStorage.hasOwnProperty('localState')) {
        this.localState.next(JSON.parse(localStorage.getItem('localState')));
    }
    this.localState.subscribe(updatedData => {
        this.localState = updatedData;
        localStorage.setItem('localState', JSON.stringify(this.localState));
    })
}
//  Browser session storage
module.exports = function sessionStateManager() {
    if (sessionStorage.hasOwnProperty('sessionState')) {
        this.sessionState.next(JSON.parse(sessionStorage.getItem('sessionState')));
    }

    this.sessionState.subscribe(updatedState => {
        this.sessionState = updatedState;
        sessionStorage.setItem('sessionState', JSON.stringify(this.sessionState));
    })
}



