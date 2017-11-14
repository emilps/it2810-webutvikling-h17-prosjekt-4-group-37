import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService} from '../services/users.service';
import { Router } from '@angular/router';
import { NavbarComponent } from './../navbar/navbar.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  state = "";
  wrongCheck= false;
  wrongName= false;
  newUser: User= {
    name:"",
    password:""
  };

  constructor(
    private userService: UserService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  async getUser() {
    if(this.newUser.name == "" || this.newUser.password == ""){
      this.wrongName = true;
    }else{
      this.state = await this.userService.getUserAsync(this.newUser);
      if(!this.state){
        this.wrongCheck = true;
        this.wrongName = false;
      }
      this.snackBar.open(this.newUser.name + ' er logget inn.', 'Undo', {
        duration: 3000
      })
      this.state ? this.router.navigate(['/']) : this.router.navigate([]);
      //NavbarComponent.loggedInNavbar();
    }

  }
}
