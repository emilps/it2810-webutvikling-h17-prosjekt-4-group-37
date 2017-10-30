import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from '../model/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

    constructor(private _http: Http) {
    }

    insertNewUser(user:User): Observable<any>{
      return this._http.post("/api/users", user)
        .map((res:any) =>{
          return res.json();
        })
        .catch((error:any) => {
          return Observable.throw(error.json ? error.json().error : error || 'server error');
        })
    }
    getUsers() {
      return this._http.get("/api/getUser")
        .map(result => this.result = result.json().data);
    }

}
