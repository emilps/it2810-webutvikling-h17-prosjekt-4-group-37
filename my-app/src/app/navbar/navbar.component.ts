import { Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { UserService} from '../services/users.service';
import { User } from '../model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserService]

})
export class NavbarComponent implements OnInit {

  public loggedInOptions = false;

  constructor(public dialog: MatDialog,private userService: UserService,){
   }

  async ngOnInit() {
    await this.userService.fetchUserAsync()
    if (this.userService.isLoggedIn()) {
      this.loggedInOptions = true;
    } else {
      this.loggedInOptions = false;
    }
  }

  public async loggedInNavbar() {
    await this.userService.fetchUserAsync()
    if (this.userService.isLoggedIn()) {
      console.log("Things working1!");
      this.login();
      console.log("This has changed to: " + this.loggedInOptions);
    } else {
      this.loggedInOptions = false;
      console.log("Logged out navbar")
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '500px',
      data: "Test tekst"
    });
  }

  login(){
    this.loggedInOptions = true;
  }

  logOut(){
    console.log("Test for logout");
    this.userService.logOutUser();
    this.loggedInOptions = false;
  }
}
