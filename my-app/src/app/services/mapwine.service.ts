import { Injectable } from '@angular/core';
//Import needed components and operators
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MapWineService {
  result:any;
  constructor(private _http: Http) { }

  /* Function to accsess DB through the server/API.
  Gets wines from the country specified by the argument */
  getCountries(arg) {
    return this._http.post("/api/countries",arg)
      .map(result => this.result = result.json().data);
  }

}
