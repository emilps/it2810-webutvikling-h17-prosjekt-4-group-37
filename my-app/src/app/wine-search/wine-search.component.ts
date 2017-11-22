// Angular imports
import { Component, OnInit } from '@angular/core';

// Import the DataService
import { DataService } from './../services/data.service';

// Import the material dialog and the SingleWineComponent thats the dialog
import { MatDialog } from '@angular/material';
import { SingleWineComponent } from './../single-wine/single-wine.component';

// Import Filter
import { Filter } from './../model/wine-filter';

@Component({
  selector: 'app-wine-search',
  templateUrl: './wine-search.component.html',
  styleUrls: ['./wine-search.component.css']
})

export class WineSearchComponent implements OnInit {
  // Defines name for selectreset
  name: string;
  // Defines if there is a search
  searchVisible = false;

  // Defines the number of wines to start with
  numberOfWines = 12;

  // Define a users property to hold our user data
  wines: Array<any>;
  countries: Array<any>;

  // Defines a filter for search, filter and sort
  newFilter: Filter = {
    wineFilter: [],
    countryFilter: [],
    wineFilterValue: "",
    sortKey: "",
    sortValue: 0,
    limit: 12,
    searchArray: [],
    searchValue: "",
  };




  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService, public dialog: MatDialog) {

    // Access the Data Service's getUsers() method we defined

    this._dataService.getWines(this.newFilter)
        .subscribe(res => this.wines = res);

    this._dataService.getDistinctCountries()
        .subscribe(res => this.countries = res.sort());

  }

  ngOnInit() {
  }

  // Opens the SingleWineComponent as a dialog
  openDialog(arg){
    let dialogRef = this.dialog.open(SingleWineComponent, {
      data: arg,
    })
    dialogRef.afterClosed().subscribe()
  }

  // Function for adding to the filter and remove value from filter.
  // Calls checkIfObjectInArray if it needs to remove
  checkbox(arg){
    var obj = JSON.parse(arg.source.value)
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
        this.checkIfObjectInArray(obj,this.newFilter.countryFilter)
      }
    }
    this.newFilter.limit = 12;
    this.sortAndFilter();
  }

  // Checks if the object is in the filterarray
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

  // Defines what to sort the wines.
  sortSelection(arg){
    if(arg.source._selected){
      let key = JSON.parse(arg.source.value);
      this.newFilter.sortKey = Object.keys(key)[0];
      this.newFilter.sortValue = key[Object.keys(key)[0]];
      this.sortAndFilter();
    }

  }

  // Sets the searchValue and splits the value into an array and calls the db.
  onEnter(value){
      this.newFilter.searchArray = value.split(" ");
      this.newFilter.searchValue = value;
      this.newFilter.limit = 12;
      this.sortAndFilter();

      if(value.length){
        this.searchVisible = true;
      }else{
        this.searchVisible = false;
      }
  }

  // Checks if the searchField is empty and then resets the search
  updateSearch(value){
      if(!value.length){
        this.newFilter.searchArray = value.split(" ");
        this.newFilter.searchValue = value;
        this.newFilter.limit = 12;
        this.sortAndFilter();
        this.searchVisible = false;
      }
  }

  // Gets info from DB through dataService
  sortAndFilter(){
    this._dataService.getWines(this.newFilter)
        .subscribe(res => this.wines = res);
    this._dataService.getWines(this.newFilter)
        .subscribe(res => this.numberOfWines = res.length);
  }

  // Increases the limit for hwo many wines you will get from DB.
  increaseLimit(){
    var limitNumber: Number;
    limitNumber = 12;
    this.newFilter.limit =+ +limitNumber + +this.newFilter.limit;
    this.sortAndFilter();
    this.numberOfWines = this.wines.length;
  }

}
