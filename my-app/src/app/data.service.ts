import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Filter } from './wine-search/filter';

@Injectable()
export class DataService {

  result:any;

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get("/api/users")
      .map(result => this.result = result.json().data);
  }

  getWines(arg:Filter) {
    console.log(arg)
    return this._http.post("/api/wines", arg)
      .map(result => this.result = result.json().data);
  }

  getRedWines() {
    return this._http.get("/api/winesRed")
      .map(result => this.result = result.json().data);
  }

  getWhiteWines() {
    return this._http.get("/api/winesWhite")
      .map(result => this.result = result.json().data);
  }

  getSortedWinesASC() {
    return this._http.get("/api/winesASC")
      .map(result => this.result = result.json().data);
  }

  getSortedWinesPriceASC() {
    return this._http.get("/api/winesPriceASC")
      .map(result => this.result = result.json().data);
  }

  getSortedWinesDESC() {
    return this._http.get("/api/winesDESC")
      .map(result => this.result = result.json().data);
  }

  getSortedWinesPriceDESC() {
    return this._http.get("/api/winesPriceDESC")
      .map(result => this.result = result.json().data);
  }

}
