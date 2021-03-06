import { Component, OnInit } from '@angular/core';
//Import Router
import { Router } from '@angular/router';
//Import our Components
import { NavbarComponent } from './../navbar/navbar.component';
import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
//Import our Services
import { MessageService } from './../services/message.service';
import { UserService } from '../services/users.service';
//Import model/filter
import { User } from '../model/user';
//Import Angular Material items
import { MatSnackBar } from '@angular/material';
import { MatDialogRef } from '@angular/material';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //Gets user when logging in
	state = "";
  //State showing error message
	wrongCheck = false;
  //State showing error message
	wrongName = false;
  //User object from login
	newUser: User = {
		name: "",
		password: ""
	};
  //Initializes services and material comp.
	constructor(
		private userService: UserService,
		private router: Router,
		public snackBar: MatSnackBar,
		public navbarComponent: NavbarComponent,
		public dialogRef: MatDialogRef<LoginDialogComponent>,
		private MessageService: MessageService

	) { }

	ngOnInit() {
	}
  //When user is logged in login button changes to profilebutton
	changeButton(): void {
		// send message to subscribers via observable subject
		this.MessageService.changeButton();
	}
  //Checks if input is filled for both password and username
  //Checks if user is in db. If not changes state for error message
  //based on type of error
  //If input is correct shows snackbar, closes dialog and changes button.
	async login() {
		if (this.newUser.name == "" || this.newUser.password == "") {
			this.wrongName = true;
		} else {
			this.state = await this.userService.loginAsync(this.newUser);
			if (!this.state) {
				this.wrongCheck = true;
				this.wrongName = false;
			} else {
				this.snackBar.open(this.newUser.name + ' er logget inn.', ' ', {
					duration: 3000
				})
				this.dialogRef.close('Closed!');
				this.changeButton();
				//this.state ? this.router.navigate(['/']) : this.router.navigate([]);
			}
		}
	}
}
