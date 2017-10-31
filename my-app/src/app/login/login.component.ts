import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService} from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  state = "false";

  newUser: User= {
    name:"",
    password:""
  };

  constructor(
    private userService: UserService

  ) { }

  ngOnInit() {
  }

  getUser() {
    this.userService
    .getUser(this.newUser)
    .subscribe(res => this.state = res)
    console.log(this.state);

  }
}
