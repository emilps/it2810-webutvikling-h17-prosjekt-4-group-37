import { Injectable } from '@angular/core';

import { Http, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Filter } from './../single-wine/winefilter';
import { UserService} from '../services/users.service';
import {UserName} from '../model/userName'


@Injectable()
export class FavoriteWineService {

    result:any;
    wineIDS:any;
    thisUser: UserName = {
      name : '',
    };

    constructor(private _http: Http, public userService: UserService) { }

    getFavoriteWine(arg:Filter) {
      console.log("API runs", arg)
      return this._http.post("/api/getfavoritewines", arg)
        .map(result => this.result = result.json().data);
    }

    updateFavoriteWine(arg:Filter) {
      console.log("API runs", arg)
      return this._http.post("/api/updatefavoritewines", arg)
        .map(result => this.result = result.json().data);
    }
    getFavoriteWines() {
      this.userService.fetchUserAsync()
      this.thisUser.name = this.userService.user.name;
      return this._http.post("api/getfavoritewinesids", this.thisUser)
      .map(result => this.result = result.json().data);
    }

    getWineInfo(){
      console.log(this.result)
      return this.result
    }



}
