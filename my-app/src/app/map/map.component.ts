import { Component, OnInit } from '@angular/core';

// Import the DataService
import { DataService } from './../data.service';

import { MapWineService } from './../services/mapwine.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { DataUser } from './../models/DataUser.model';

import { MapFilter } from './mapFilter';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  wines: Array<any>;

  newMapFilter: MapFilter = {
    mapFilterValue: "",
  }

  dataSource = new UserDataSource(this.mapWineService);
  displayedColumns = ['name', 'email', 'phone', 'company'];

  // Create an instance of the DataService through dependency injection
  constructor(private mapWineService: MapWineService) {

    // Access the Data Service's getWines() method we defined
    //this._dataService.getCountries(this.newMapFilter)
      //  .subscribe(res => this.wines = res);
  }

  ngOnInit() {
  }

  countryChange() {
    const illegalCountries = ["Verden", "Afrika", "Europa", "Asia", "Amerika"];
    let country = document.getElementById('regionTitle').innerHTML;
    if(!illegalCountries.includes(country)){
    //  this.newMapFilter.mapFilterValue = country;
      //this._dataService.getCountries(this.newMapFilter)
        //  .subscribe(res => this.wines = res);
    }
  }

}

export class UserDataSource extends DataSource<any> {
  constructor(private mapWineService: MapWineService) {
    super();
  }
  connect(): Observable<DataUser []> {
    return this.mapWineService.getUser();
  }

  disconnect() {}
}
