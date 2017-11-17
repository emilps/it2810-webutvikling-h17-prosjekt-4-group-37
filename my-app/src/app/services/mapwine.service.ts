import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { User } from '../model/user';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MapWineService {

  result:any;

  constructor(private _http: Http) { }
  getCountries(arg) {
    return this._http.post("/api/countries",arg)
      .map(result => this.result = result.json().data);
  }

}
