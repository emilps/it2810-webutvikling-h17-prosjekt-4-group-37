import { Injectable } from '@angular/core';
//Import Http and SearchParamenters
import { Http, URLSearchParams } from '@angular/http';
//Import our Service
import { UserService } from '../services/users.service';
//Import needed data types
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//Import models/filters
import { User } from '../model/user';
import { UserName } from '../model/userName'
import { Filter } from './../model/single-wine';

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
