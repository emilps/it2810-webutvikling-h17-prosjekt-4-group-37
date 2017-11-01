import { Component, OnInit } from '@angular/core';

// Import the DataService
import { DataService } from './../data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // Define a users property to hold our user data
  wines: Array<any>;

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {

    // Access the Data Service's getWines() method we defined
    this._dataService.getWines()
        .subscribe(res => this.wines = res);
  }

  ngOnInit() {
  }

}
