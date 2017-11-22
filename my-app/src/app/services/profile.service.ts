import { Injectable } from '@angular/core';
//Import Http and URL SearchParamenters
import { Http, URLSearchParams } from '@angular/http';
//Import our Service(s)
import { UserService } from '../services/users.service';
//Import needed data types
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//Import models/filters
import { User } from '../model/user';
import { UserName } from '../model/userName';
import { Filter } from './../model/profile';

@Injectable()
export class ProfileService {
  result: any;
  //Initializes http and service
	constructor(private _http: Http, private userService: UserService) { }
  //Gathers wine log from user.
	async getWinesLog(): Promise<void> {
		const response = await this._http.get("api/getwineslog").toPromise()
		return response.json().data
	}
	//Add wine to wine log.
	addToLog(arg){
		console.log("This arg:", arg)
		return this._http.post("api/addtolog", arg)
      .map(result => this.result = result.json().data)
	}
  //Gahters recommendation of wine.
	async getRecom(filter: Filter) {
		const response = await this._http.post("api/getrecommendedwine", filter).toPromise()
		const recWine = response.json().data
		return recWine
	}
}
