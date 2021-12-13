import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    public localState: any = {
        masterData: {}
    }

    public sessionState: any = {
        default: {}
    }

    public localStateManager = new BehaviorSubject<any>(this.localState); // Local storage
    public sessionStateManager = new BehaviorSubject<any>(this.sessionState); // Session storage

    constructor() {
        if (localStorage.hasOwnProperty('localState')) {
            this.localStateManager.next(JSON.parse(localStorage.getItem('localState')));
        }
        this.localStateManager.subscribe(updatedData => {
            this.localState = updatedData;
            localStorage.setItem('localState', JSON.stringify(this.localState));
        })

        if (sessionStorage.hasOwnProperty('sessionState')) {
            this.sessionStateManager.next(JSON.parse(sessionStorage.getItem('sessionState')));
        }

        this.sessionStateManager.subscribe(updatedState => {
            this.sessionState = updatedState;
            sessionStorage.setItem('sessionState', JSON.stringify(this.sessionState));
        })

    }

}
