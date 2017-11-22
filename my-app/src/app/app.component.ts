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
  // Create an instance of the DataService through dependency injection
  constructor(
    private _dataService: DataService,
    private userService: UserService
  ) {

  }

  ngOnInit() {

  }
}
