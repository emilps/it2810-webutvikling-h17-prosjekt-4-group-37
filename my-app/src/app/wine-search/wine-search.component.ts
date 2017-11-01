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
    console.log(obj)

    console.log(arg.checked, " : ",obj)
    //console.log(red)
    if (arg.checked){
      console.log("Checked")
      this.newFilter.wineFilter.push(obj)
      console.log(this.newFilter.wineFilter)

    }else if (!arg.checked){
      this.checkIfObjectInArray(obj,this.newFilter.wineFilter)
    }
    console.log("filterlist: ",this.newFilter.wineFilter)
    this.sortAndFilter();
  }

  checkIfObjectInArray(obj, array){
    console.log(obj.Varetype)
    var newArray = array.map((item) => item.Varetype == obj.Varetype)
    console.log("NewArray: ", newArray)

    if(array.length > 0){
      console.log("With : ",array)
      for(var x = 0; x < newArray.length; x++){
        if(newArray[x] && array.length == 1){
          console.log(newArray[x], " This shouldnt run")
          array = []
        }else if(newArray[x]){
          array.splice(x,1)
        }
      }
      this.newFilter.wineFilter = array
      console.log("Without redwine: ",array)
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
