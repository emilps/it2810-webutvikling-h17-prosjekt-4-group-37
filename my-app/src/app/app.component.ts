import { Component, OnInit } from '@angular/core';

// Import the DataService
import { DataService } from './services/data.service';
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
    
  }

  ngOnInit() {

  }
}
