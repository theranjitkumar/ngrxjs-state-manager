import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    // Local storage
    public initialLocalState: any = {
        masterData: {}
    }

    // Session storage
    public initialSessionState: any = {
        default: {}
    }

    public localState = new BehaviorSubject<any>(this.initialLocalState); // Local storage
    public sessionState = new BehaviorSubject<any>(this.initialSessionState); // Session storage

    constructor() {
        // Browser local storage
        if (localStorage.hasOwnProperty('localState')) {
            this.localState.next(JSON.parse(localStorage.getItem('localState')));
        }
        this.localState.subscribe(updatedData => {
            this.localState = updatedData;
            localStorage.setItem('localState', JSON.stringify(this.localState));
        })

        // Browser session storage
        if (sessionStorage.hasOwnProperty('sessionState')) {
            this.sessionState.next(JSON.parse(sessionStorage.getItem('sessionState')));
        }

        this.sessionState.subscribe(updatedState => {
            this.sessionState = updatedState;
            sessionStorage.setItem('sessionState', JSON.stringify(this.sessionState));
        })

    }

}
