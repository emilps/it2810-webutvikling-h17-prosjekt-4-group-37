import { Component, OnInit } from '@angular/core';

// Import the DataService
import { DataService } from './../data.service';

import { Filter } from './filter';

@Component({
  selector: 'app-wine-search',
  templateUrl: './wine-search.component.html',
  styleUrls: ['./wine-search.component.css']
})
export class WineSearchComponent implements OnInit {

  // Define a users property to hold our user data
  users: Array<any>;
  wines: Array<any>;

  newFilter: Filter = {
    wineFilter: "",
    wineFilterValue: "",
    priceSort: 0,
    letterSort: 0,
  };



  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {

    // Access the Data Service's getUsers() method we defined
    this._dataService.getUsers()
        .subscribe(res => this.users = res);

    this._dataService.getWines(this.newFilter)
        .subscribe(res => this.wines = res);
  }


  filterRed() {
    this.newFilter.wineFilter = "Varetype";
    this.newFilter.wineFilterValue = "Rødvin";
    this.sortAndFilter();
  }

  filterWhite() {
    this.newFilter.wineFilter = "Varetype";
    this.newFilter.wineFilterValue = "Hvitvin";
    this.sortAndFilter();
  }

  sortLetterASC() {
    this.newFilter.priceSort = 0;
    this.newFilter.letterSort = 1;
    this.sortAndFilter();
  }

  sortPriceASC() {
    this.newFilter.priceSort = 1;
    this.newFilter.letterSort = 0;
    this.sortAndFilter();
  }

  sortLetterDESC() {
    this.newFilter.priceSort = 0;
    this.newFilter.letterSort = -1;
    this.sortAndFilter();
  }

  sortPriceDESC() {
    this.newFilter.priceSort = -1;
    this.newFilter.letterSort = 0;
    this.sortAndFilter();
  }

  sortAndFilter(){
    this._dataService.getWines(this.newFilter)
        .subscribe(res => this.wines = res);
  }

  noSort() {
    this.newFilter.priceSort = 0;
    this.newFilter.letterSort = 0;
    this.sortAndFilter();
  }

  noFilter() {
    this.newFilter.wineFilter = "";
    this.newFilter.wineFilterValue = "";
    this.sortAndFilter();
  }

  ngOnInit() {
  }

}
