import { Component, OnInit } from '@angular/core';

// Import the DataService
import { DataService } from './data.service';
import { UserService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Define a users property to hold our user data
  /*users: Array<any>;
  wines: Array<any>;
  */

  // Create an instance of the DataService through dependency injection
  constructor(
    private _dataService: DataService,
    private userService: UserService
  ) {

    // Access the Data Service's getUsers() method we defined
    /*
    this._dataService.getUsers()
        .subscribe(res => this.users = res);

    this._dataService.getWines()
        .subscribe(res => this.wines = res);
    */
  }

  ngOnInit() {

  }
}
