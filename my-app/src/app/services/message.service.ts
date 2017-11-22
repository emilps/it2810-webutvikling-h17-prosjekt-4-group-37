import { Injectable } from '@angular/core';
//Import needed data types
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
    private subject = new Subject<any>();
    private counter = 0;
    //Comment
    changeButton() {
        this.counter++
        this.subject.next({ value: this.counter });
    }
    //Comment
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    private receiver = new Subject<any>();
    //Comment
    removeWine(message: string) {
        this.receiver.next({text: message})
    }
    //Comment
    receiveID(): Observable<any> {
        return this.receiver.asObservable();
    }
}
