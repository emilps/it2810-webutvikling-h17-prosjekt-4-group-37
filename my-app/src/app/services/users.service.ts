import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { User } from '../model/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

    public user: any;
    constructor(private _http: Http) {
    }

    insertNewUser(user:User){
      return this._http.post("/api/register", user)
        //.map((res:any) =>{
          //return res.json();
        //})
        //.catch((error:any) => {
        //  return Observable.throw(error.json ? error.json().error : error || 'server error');
        //})
    }

    getUser(user:User){
      return this._http.post("/api/getUser", user).map(result => this.user = result.json())
    }

    //getUsers() {
      //return this._http.get("/api/getUser")
        //.map(result => this.result = result.json().data);
    //}
    public async getUserAsync(user: User) {
      try {
        const response = await this._http.post('/api/getUser', user).toPromise()
        this.user = response.json()
        return this.user
      } catch (err) {
      }
    }

    public async fetchUserAsync() {
      try {
        const response = await this._http.get('/api/me').toPromise()
        this.user = response.json()
        return this.user
      } catch (err) {
      }
    }

    public async insertNewUserAsync(user: User) {
      try {
        const response = await this._http.post("/api/register", user).toPromise()
        this.user = response.json()
        return this.user
      } catch (err) {
      }
    }

    public isLoggedIn(): boolean {
      return this.user ? true : false
    }
}
