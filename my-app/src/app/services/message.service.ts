import { Injectable } from '@angular/core';
//Import needed data types
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {

    private subject = new Subject<any>();

    // Trigger function
    changeButton() {
        this.subject.next({});
    }
    // Tells the listener that changeButton has been triggered
    changeButtonAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    // Trigger function. Sends the ID as well for debugging/validation purposes
    updateFavoriteWines(message: string) {
        this.subject.next({text: message})
    }
    // Tells the listener that favorite wines has been updated
    receiveUpdateAlert(): Observable<any> {
        return this.subject.asObservable();
    }
}
