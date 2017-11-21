import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/users.service';
import { User } from '../model/user';
import { UserName } from '../model/userName';
import { Filter } from './../model/profile';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProfileService {

  //Initializes http and service
	constructor(private _http: Http, private userService: UserService) { }
  //Gathers wine log from user.
	async getWinesLog(): Promise<void> {
		const response = await this._http.get("api/getwineslog").toPromise()
		return response.json().data
	}

	//Add wine to wine log.
	addToLog(arg) {
		console.log("This arg:", arg)
		this._http.post("/api/addtolog", arg).subscribe()
	}
  //Gahters recommendation of wine.
	async getRecom(filter: Filter) {
		const response = await this._http.post("api/getrecommendedwine", filter).toPromise()
		const recWine = response.json().data
		return recWine
	}
}
