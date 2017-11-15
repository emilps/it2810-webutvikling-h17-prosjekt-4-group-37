import { Injectable } from '@angular/core';

import { Http, URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Filter } from './../single-wine/winefilter';

import { DataUser } from '../models/DataUser.model';

@Injectable()
export class MapWineService {

  private serviceURL = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getUser(): Observable<DataUser []> {
    return this.http.get<DataUser []>(this.serviceURL);
  }

}
