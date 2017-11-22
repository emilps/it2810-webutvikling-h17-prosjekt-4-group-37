import { Component, OnInit } from '@angular/core';
//Routing import
import { Router } from '@angular/router';
//Import our Service(s)
import { UserService} from '../services/users.service';
//Import model/filter
import { User } from '../model/user';
//Import Angular Material item
import { MatSnackBar } from '@angular/material';
import { MessageService } from './../services/message.service';
import { MatDialogRef } from '@angular/material';
import { LoginDialogComponent } from './../login-dialog/login-dialog.component';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  state = false;
  newUser: User = {
    name: "",
    password: "",
  };
  repeatPassword ="";
  errorText = "";
  showError = false;


  constructor(
    private userService: UserService,
    private router: Router,
    public snackBar: MatSnackBar,
    private MessageService: MessageService,
    public dialogRef: MatDialogRef<LoginDialogComponent>,




  ) { }

  ngOnInit() {
  }

  changeButton(): void {
		// send message to subscribers via observable subject
		this.MessageService.changeButton();
	}


  async insertNewUser() {
    console.log("HEHQHWQEHQWEHEQWHEQWH")

    if (this.newUser.name == "" || this.newUser.password == "") {
      this.errorText = "Fyll ut alle felter";
      this.showError= true;
    } else if (this.newUser.name.length < 4 || this.newUser.name.length > 20) {
      this.errorText = "Brukernavn må være mellom 4 og 20 tegn";
      this.showError = true;
    } else if (this.newUser.password.length < 8 || this.newUser.password.length > 32) {
      this.errorText = "Passord må være mellom 8 og 32 tegn";
      this.showError = true;
    } else if (this.newUser.password !== this.repeatPassword) {
      this.errorText = "Passord matcher ikke";
      this.showError = true;
    } else {
    this.state = await this.userService.insertNewUserAsync(this.newUser);
    if (!this.state) {
      this.errorText = "Bruker finnes allerede";
      this.showError = true;
    } else {

      this.snackBar.open(this.newUser.name + ' er registrert og du ble automatisk logget inn.', ' ', {
        duration: 3000
      })
      this.changeButton();
      this.dialogRef.close('Closed!');

    }
    }
  };
}
