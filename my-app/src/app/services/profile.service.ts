import { Injectable } from '@angular/core';

import { Http, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { UserService} from '../services/users.service';

import { User } from '../model/user';
import {UserName} from '../model/userName'
import { Filter } from './../profile/filter'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class ProfileService {
  result: any;
  listLog: any;
  wineList: any;
  userWineProfile: any;
  thisUser: UserName = {
    name : '',
  };

  constructor(private _http: Http, private userService: UserService) { }

  async getWinesLog(): Promise<void> {
    this.userService.fetchUserAsync()
    this.thisUser.name = this.userService.user.name;
    const response = await this._http.post("api/getwineslog", this.thisUser).toPromise()
    return response.json().data
  }

  //change location to a more apropriate service..
  addToLog(arg){
    return this._http.post("/api/addtolog", arg)
      .map(result => {
        this.result = result.json().data
      });
  }

  async getRecom(filter: Filter){
    console.log("Running getRecom : ", filter)
    const response = await this._http.post("api/getrecommendedwine", filter).toPromise()
    const recWine=  response.json().data
    return recWine


  }




}
