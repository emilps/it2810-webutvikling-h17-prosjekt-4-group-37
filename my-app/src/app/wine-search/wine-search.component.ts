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
  name: string;

  // Define a users property to hold our user data
  users: Array<any>;
  wines: Array<any>;

  newFilter: Filter = {
    wineFilter: [],
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

  checkbox(arg){
    var obj = JSON.parse(arg.source.value)

    if (arg.checked){
      this.newFilter.wineFilter.push(obj)
    } else if (!arg.checked){
      this.checkIfObjectInArray(obj,this.newFilter.wineFilter)
    }
    this.sortAndFilter();
  }

  checkIfObjectInArray(obj, array){
    if(Object.keys(obj)[0] == "Varetype"){
      var newArray = array.map((item) => item.Varetype == obj.Varetype)
    }else if(Object.keys(obj)[0] == "Land"){
      var newArray = array.map((item) => item.Land == obj.Land)
    }

    if(array.length > 0){
      for(var x = 0; x < newArray.length; x++){
        if(newArray[x] && array.length == 1){
          array = []
        }else if(newArray[x]){
          array.splice(x,1)
        }
      }
      this.newFilter.wineFilter = array
    }
  }

  checkSelection(arg){
    if(arg.source._selected){
      if(arg.source.value == "ASC"){
        this.sortPriceASC()
      }else if(arg.source.value == "DESC"){
        this.sortPriceDESC()
      }else if(arg.source.value == "LDESC"){
        this.sortLetterDESC()
      }else if(arg.source.value == "LASC"){
        this.sortLetterASC()

      }else{
        this.noSort()
      }
      console.log("This list: ",this.newFilter.wineFilter)
    }

  }

  filterRed() {
    //console.log(this.objectInList(this.newFilter.wineFilter))
    var red = {"Varetype":"Rødvin"}
    this.newFilter.wineFilter.push(red);
    this.checkIfObjectInArray(red, this.newFilter.wineFilter)
    if(Object.values(this.newFilter.wineFilter[0])[0] == red.Varetype){
      console.log("Runs")
    }
    this.newFilter.wineFilterValue = "Rødvin";
    this.sortAndFilter();
  }

  filterWhite() {
    this.newFilter.wineFilter = [{"Varetype":"Hvitvin"}];
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
    this.newFilter.wineFilter = [];
    this.newFilter.wineFilterValue = "";
    this.sortAndFilter();
  }

  ngOnInit() {
  }

}
