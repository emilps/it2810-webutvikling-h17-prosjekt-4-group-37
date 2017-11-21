import { Injectable } from '@angular/core';

import { Http, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Filter } from './../single-wine/winefilter';
import { UserService } from '../services/users.service';
import { UserName } from '../model/userName'


@Injectable()
export class FavoriteWineService {
    //Used as a temp. atributte for retriveal
    result:any;
    //Initializes http and service.
    constructor(private _http: Http, public userService: UserService) { }
    //sends post request for retriving favorites wines from db.
    getFavoriteWine(arg:Filter) {
      return this._http.post("/api/getfavoritewines", arg)
        .map(result => this.result = result.json().data);
    }
    //Updates list of favorite wines.
    updateFavoriteWine(arg:Filter) {
      return this._http.post("/api/updatefavoritewines", arg)
        .map(result => this.result = result.json().data);
    }
    //Gathers all wines from a user.
    getFavoriteWines() {
      return this._http.get("api/getfavoritewinesids")
      .map(result => this.result = result.json().data);
    }
    //return temp. atr.
    getWineInfo(){
      return this.result
    }



}
