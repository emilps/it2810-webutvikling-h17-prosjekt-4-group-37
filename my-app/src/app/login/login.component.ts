import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService} from '../services/users.service';
import { Router } from '@angular/router';
import { NavbarComponent } from './../navbar/navbar.component';
import {MatSnackBar} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import {LoginDialogComponent} from './../login-dialog/login-dialog.component';

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
    public snackBar: MatSnackBar,
    public navbarComponent : NavbarComponent,
    public dialogRef: MatDialogRef<LoginDialogComponent>

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
      }else{
        this.snackBar.open(this.newUser.name + ' er logget inn.', ' ', {
          duration: 3000
        })
        this.dialogRef.close('Closed!');
        this.state ? this.router.navigate(['/']) : this.router.navigate([]);
        this.navbarComponent.loggedInNavbar();
      }
    }
  }
}
