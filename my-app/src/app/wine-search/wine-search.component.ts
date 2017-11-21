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
  countries: Array<any>;

  newFilter: Filter = {
    wineFilter: [],
    countryFilter: [],
    wineFilterValue: "",
    sortKey: "",
    sortValue: 0,
    limit: 12,
    searchValue: "",
  };




  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService, public dialog: MatDialog) {

    // Access the Data Service's getUsers() method we defined

    this._dataService.getWines(this.newFilter)
        .subscribe(res => this.wines = res);

    this._dataService.getDistinctCountries()
        .subscribe(res => this.countries = res);

  }

  openDialog(arg){
    let dialogRef = this.dialog.open(SingleWineComponent, {
      //width: '600px',
      data: arg,
    })

    dialogRef.afterClosed().subscribe()

  }

  checkbox(arg){
    var obj = JSON.parse(arg.source.value)
    console.log("Object KEY: ",Object.keys(obj)[0])
    if (arg.checked){
      if (Object.keys(obj)[0] == "Varetype"){
        this.newFilter.wineFilter.push(obj)
      } else if(Object.keys(obj)[0] == "Land"){
        this.newFilter.countryFilter.push(obj)
      }
    } else if (!arg.checked){
      if (Object.keys(obj)[0] == "Varetype"){
        this.checkIfObjectInArray(obj,this.newFilter.wineFilter)
      } else if(Object.keys(obj)[0] == "Land"){
        this.checkIfObjectInArrayCountry(obj,this.newFilter.countryFilter)
      }

    }
    this.newFilter.limit = 12;
    this.sortAndFilter();
  }

  checkIfObjectInArray(obj, array){
    if(Object.keys(obj)[0] == "Varetype"){
      var newArray = array.map((item) => item.Varetype == obj.Varetype)
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
    }else if(Object.keys(obj)[0] == "Land"){
      var newArray = array.map((item) => item.Land == obj.Land)
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


  }

  checkboxCountry(arg){
    var obj = JSON.parse(arg.source.value)
    console.log("Object KEY: ",Object.keys(obj)[0])
    if (arg.checked){
      this.newFilter.countryFilter.push(obj)
    } else if (!arg.checked){
      this.checkIfObjectInArray(obj,this.newFilter.countryFilter)
    }
    this.newFilter.limit = 12;
    this.sortAndFilter();
  }

  checkIfObjectInArrayCountry(obj, array){
    if(Object.keys(obj)[0] == "Varetype"){
      var newArray = array.map((item) => item.Varetype == obj.Varetype)
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
    }else if(Object.keys(obj)[0] == "Land"){
      var newArray = array.map((item) => item.Land == obj.Land)
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


  }

  sortSelection(arg){
    if(arg.source._selected){
      let key = JSON.parse(arg.source.value);
      this.newFilter.sortKey = Object.keys(key)[0];
      this.newFilter.sortValue = key[Object.keys(key)[0]];
      this.sortAndFilter();
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

  sortAndFilter(){
    this._dataService.getWines(this.newFilter)
        .subscribe(res => this.wines = res);
    this._dataService.getWines(this.newFilter)
        .subscribe(res => this.numberOfWines = res.length);
  }

  noFilter() {
    this.newFilter.wineFilter = [];
    this.newFilter.wineFilterValue = "";
    this.sortAndFilter();
  }

  increaseLimit(){
    var limitNumber: Number;
    limitNumber = 12;

    this.newFilter.limit =+ +limitNumber + +this.newFilter.limit;
    this.sortAndFilter();
    this.numberOfWines = this.wines.length;
  }

  ngOnInit() {
  }

}
