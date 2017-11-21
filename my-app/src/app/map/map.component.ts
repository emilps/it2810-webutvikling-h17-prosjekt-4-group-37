import { Component, OnInit } from '@angular/core';
//Import needed datatypes
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
//Import Service, Filter and other used component(s)
import { MapWineService } from './../services/mapwine.service';
import { SingleWineComponent } from './../single-wine/single-wine.component';
import { MapFilter } from './mapFilter';
//Import Angular Material Components
import { MatDialog, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  //The array containing all the wines fetched from the DB
  wines: Array<any>;
  //Tooltip position
  public position = 'above';

  //The new MapFilter instance to be used and changed for DB calls
  newMapFilter: MapFilter = {
    mapFilterValue: "",
    limit: 25,
  }
  //The dataSource for the Material Table and what columns it should display
  dataSource = new WineDataSource();
  displayedColumns = ['name', 'country', 'price'];

  ngOnInit() {
    }

  // Create an instance of the MapWineService through dependency injection
  constructor(private mapWineService: MapWineService, public dialog: MatDialog) {

     //Access the WineService's geCountriess() method we defined
     this.mapWineService.getCountries(this.newMapFilter)
      .subscribe(res => this.loadArray(res));
  }
  /* Sets the data to the response from the database and loads the Table with
  the new wines */
  loadArray(res){
    data = res;
    this.dataSource = new WineDataSource();
  }

  /* Function called when map is clicked, changes the filter and loads Table
  with the new response data */
  countryChange() {
    const illegalCountries = ["Verden", "Afrika", "Europa", "Asia", "Amerika"];
    let country = document.getElementById('regionTitle').innerHTML;
    if(!illegalCountries.includes(country)){
      this.newMapFilter.mapFilterValue = country;
      this.mapWineService.getCountries(this.newMapFilter)
      .subscribe(res => this.loadArray(res));
    }
  }
  //Opens a dialog with more info on the wine clicked in the Table
  onWineClick(wine){
    let dialogRef = this.dialog.open(SingleWineComponent, {data: wine,})
  }
  //Loads more data to the Table on click of button "Last inn flere.."
  increaseLimit(){
    this.newMapFilter.limit =+ +25 + +this.newMapFilter.limit;
    this.mapWineService.getCountries(this.newMapFilter)
      .subscribe(res => this.loadArray(res));
  }

}

//Structure of Wines in data
export interface Wine {
  Varenavn: string;
  Land: string;
  Pris: number;
}

//Data to be displayed by the Table
let data: Wine[];

//WineDataSource fills the dataSource that shows in the Table
export class WineDataSource extends DataSource<any> {
   /** Connect function called by the table to retrieve one stream containing the data to render. */
   connect(): Observable<Wine[]> {
    return Observable.of(data);
    }
    disconnect() {}
 }
