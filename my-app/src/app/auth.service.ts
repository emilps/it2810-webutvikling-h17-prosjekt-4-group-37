import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { DataService } from './data.service';



@Injectable()
export class AuthService {
	result: any;
	redirectUrl: string;
	constructor(private _dataService: DataService) {
		this._dataService.getLoginStatus()
			.subscribe(res => this.result = res)
	}

	// store the URL so we can redirect after logging in


}