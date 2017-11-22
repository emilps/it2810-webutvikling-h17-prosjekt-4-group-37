import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
	result = false;
	redirectUrl: string;
	constructor(private _http: Http) {
	}

	// store the URL so we can redirect after logging in

	isLoggedIn = this.checkStatus()

	checkStatus () {
		return this._http.get("/api/loginstatus").map(result => this.result = result.json().data)
	}
}
