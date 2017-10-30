import { Component, OnInit } from '@angular/core';

// Import the DataService
import { DataService } from './../data.service';

@Component({
  selector: 'app-wine-search',
  templateUrl: './wine-search.component.html',
  styleUrls: ['./wine-search.component.css']
})
export class WineSearchComponent implements OnInit {

  // Define a users property to hold our user data
  users: Array<any>;
  wines: Array<any>;

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {

    // Access the Data Service's getUsers() method we defined
    this._dataService.getUsers()
        .subscribe(res => this.users = res);

    this._dataService.getWines()
        .subscribe(res => this.wines = res);
  }

  filterRed() {
    this._dataService.getRedWines()
        .subscribe(res => this.wines = res);
  }

  filterWhite() {
    this._dataService.getWhiteWines()
        .subscribe(res => this.wines = res);
  }

  sortLetterASC() {
    this._dataService.getSortedWinesASC()
        .subscribe(res => this.wines = res);
  }

  sortPriceASC() {
    this._dataService.getSortedWinesPriceASC()
        .subscribe(res => this.wines = res);
  }

  sortLetterDESC() {
    this._dataService.getSortedWinesDESC()
        .subscribe(res => this.wines = res);
  }

  sortPriceDESC() {
    this._dataService.getSortedWinesPriceDESC()
        .subscribe(res => this.wines = res);
  }

  noSort() {
    this._dataService.getWines()
        .subscribe(res => this.wines = res);
  }

  ngOnInit() {
  }

}
