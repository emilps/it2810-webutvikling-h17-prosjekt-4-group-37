import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DataService {

  result:any;

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get("/api/users")
      .map(result => this.result = result.json().data);
  }

  getWines() {
    return this._http.get("/api/wines")
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
