import { Component, OnInit } from '@angular/core';

// Import the DataService
import { DataService } from './../data.service';
import { MatDialog } from '@angular/material';
import { SingleWineComponent } from './../single-wine/single-wine.component';

import { Filter } from './filter';

@Component({
  selector: 'app-wine-search',
  templateUrl: './wine-search.component.html',
  styleUrls: ['./wine-search.component.css']
})
export class WineSearchComponent implements OnInit {
  name: string;
  searchVisible = false;
  numberOfWines = 12;

  // Define a users property to hold our user data
  wines: Array<any>;

  newFilter: Filter = {
    wineFilter: [],
    countryFilter: [],
    wineFilterValue: "",
    priceSort: 0,
    letterSort: 0,
    limit: 12,
    searchValue: "",
  };




  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService, public dialog: MatDialog) {

    // Access the Data Service's getUsers() method we defined

    this._dataService.getWines(this.newFilter)
        .subscribe(res => this.wines = res);

  }

  openDialog(arg){
    let dialogRef = this.dialog.open(SingleWineComponent, {
      //width: '600px',
      data: arg,
    })
    dialogRef.afterClosed().subscribe(result => console.log(result))

  }

  checkbox(arg){
    var obj = JSON.parse(arg.source.value)

    if (arg.checked){
      this.newFilter.wineFilter.push(obj)
    } else if (!arg.checked){
      this.checkIfObjectInArray(obj,this.newFilter.wineFilter)
    }
    this.newFilter.limit = 12;
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

  checkboxCountry(arg){
    var obj = JSON.parse(arg.source.value)

    if (arg.checked){
      this.newFilter.countryFilter.push(obj)
    } else if (!arg.checked){
      this.checkIfObjectInArrayCountry(obj,this.newFilter.countryFilter)
    }
    this.newFilter.limit = 12;
    this.sortAndFilter();
  }

  checkIfObjectInArrayCountry(obj, array){
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
      this.newFilter.countryFilter = array
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
      //console.log("This list: ",this.newFilter.wineFilter)
    }

  }

  onEnter(value){
      this.newFilter.searchValue = value
      this.newFilter.limit = 12;
      this.sortAndFilter();

      if(value.length){
        this.searchVisible = true;
      }else{
        this.searchVisible = false;
      }
  }

  updateSearch(value){
      if(!value.length){
        this.newFilter.searchValue = value
        this.newFilter.limit = 12;
        this.sortAndFilter();
        this.searchVisible = false;
      }
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
    this._dataService.getWines(this.newFilter)
        .subscribe(res => this.numberOfWines = res.length);
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

  increaseLimit(){
    console.log("Before Wines: ", this.wines.length, " + ", "limit: ",this.newFilter.limit)
    var limitNumber: Number;
    limitNumber = 12;

    this.newFilter.limit =+ +limitNumber + +this.newFilter.limit;
    this.sortAndFilter();
    console.log("After Wines: ", this.wines.length, " + ", "limit: ",this.newFilter.limit)
    this.numberOfWines = this.wines.length;
  }

  ngOnInit() {
  }

}
