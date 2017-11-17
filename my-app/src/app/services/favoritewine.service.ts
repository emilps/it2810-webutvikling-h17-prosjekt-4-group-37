import { Injectable } from '@angular/core';

import { Http, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Filter } from './../single-wine/winefilter';


@Injectable()
export class FavoriteWineService {

    result:any;
    wineIDS:any;

    constructor(private _http: Http) { }

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
      return this._http.get("api/getFavoriteWinesIds")
      .map(result => this.result = result.json().data);
    }



}
