import { Component, OnInit } from '@angular/core';

import { MapWineService } from './../services/mapwine.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';


import { MapFilter } from './mapFilter';
import 'rxjs/add/observable/of';

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
  dataSource = new WineDataSource();
  displayedColumns = ['name', 'country', 'price'];

  // Create an instance of the DataService through dependency injection
  constructor(private mapWineService: MapWineService) {

     //Access the WineService's geCountriess() method we defined
     this.mapWineService.getCountries(this.newMapFilter)
      .subscribe(res => this.loadArray(res));
  }

  loadArray(res){
    data = res;
    this.dataSource = new WineDataSource();
  }

  ngOnInit() {
  }


  countryChange() {
    const illegalCountries = ["Verden", "Afrika", "Europa", "Asia", "Amerika"];
    let country = document.getElementById('regionTitle').innerHTML;
    if(!illegalCountries.includes(country)){
      this.newMapFilter.mapFilterValue = country;
      this.mapWineService.getCountries(this.newMapFilter)
      .subscribe(res => this.loadArray(res));
    }
  }

}

export interface Wine {
  Varenavn: string;
  Land: string;
  Pris: number;
}

let data: Wine[];

export class WineDataSource extends DataSource<any> {
   /** Connect function called by the table to retrieve one stream containing the data to render. */
   connect(): Observable<Wine[]> {
    return Observable.of(data);
    }
    disconnect() {}
 }
