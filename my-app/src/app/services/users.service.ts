import { Component, Injectable } from '@angular/core';
//Import Http and URL SearchParamenters
import { Http, URLSearchParams } from '@angular/http';
//Import our NavbarComponent
import { NavbarComponent } from './../navbar/navbar.component';
//Import needed data types
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
    }

    login(user:User){
      return this._http.post("/api/login", user).map(result => this.user = result.json())
    }


    public async loginAsync(user: User) {
      try {
        const response = await this._http.post('/api/login', user).toPromise()
        this.user = response.json()
        return this.user
      } catch (err) {
      }
    }

    public async fetchUserAsync() {
      try {
        this.user = false;
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

    public logOutUser(){
      this._http.get('/api/logout').toPromise()
      this.user = false;
    }
}
