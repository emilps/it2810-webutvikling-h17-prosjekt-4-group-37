import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService} from '../services/users.service';
import { Router } from '@angular/router';
import { NavbarComponent } from './../navbar/navbar.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  state = "";
  wrongCheck= false;
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
    if(!this.state){
      this.wrongCheck= true;
    }

    this.state ? this.router.navigate(['/']) : this.router.navigate([]);
    //NavbarComponent.loggedInNavbar();
  }
}
