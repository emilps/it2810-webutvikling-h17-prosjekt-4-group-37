import { Injectable } from '@angular/core';

import { Http, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class ProfileService {
  result: any;
  listLog: any;
  constructor(private _http: Http) { }

  async getWinesLog(): Promise<void> {
    const response = await this._http.get("api/getwineslog").toPromise()
    return response.json().data
  }

  //change location to a more apropriate service..
  addToLog(arg){
    return this._http.post("/api/addtolog", arg)
      .map(result => {
        this.result = result.json().data
      });
  }

}
