import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService} from '../services/users.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  state = "";

  newUser: User= {
    name:"",
    password:""
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async getUser() {
    this.state = await this.userService.getUserAsync(this.newUser);
    this.state ? this.router.navigate(['/navbar']) : this.router.navigate(['/register']);
  }
}
