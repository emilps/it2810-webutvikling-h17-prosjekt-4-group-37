// Angular imports
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Filter imports
import { Filter } from './../wine-search/filter';

@Injectable()
export class DataService {

  result:any;

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get("/api/users")
      .map(result => this.result = result.json().data);
  }

  getWines(arg:Filter) {
    return this._http.post("/api/wines", arg)
      .map(result => this.result = result.json().data);
  }

  getDistinctCountries() {
    return this._http.get("/api/distinctcountries")
      .map(result => this.result = result.json().data);
  }

  getLoginStatus () {
      return this._http.get("/api/loginstatus").map(result => this.result = result.json().data)

  }

  getCountries(arg) {
    return this._http.post("/api/countries",arg)
      .map(result => this.result = result.json().data);
  }

}
