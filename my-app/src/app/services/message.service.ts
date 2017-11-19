import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
    private subject = new Subject<any>();
    private counter = 0;



    changeButton() {
        this.counter++
        this.subject.next({ value: this.counter });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}