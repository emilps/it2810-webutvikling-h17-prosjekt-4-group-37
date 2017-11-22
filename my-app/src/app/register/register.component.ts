import { Component, OnInit } from '@angular/core';
//Routing import
import { Router } from '@angular/router';
//Import our Service(s)
import { UserService} from '../services/users.service';
//Import model/filter
import { User } from '../model/user';
//Import Angular Material item
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  state = false;
  wrongCheck = false;
  wrongName = false;
  diffPassword = false;
  newUser: User = {
    name: "",
    password: "",
  };
  repeatPassword = "";

  constructor(
    private userService: UserService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  async insertNewUser() {
    if(this.newUser.name == "" || this.newUser.password == ""){
      this.wrongName = true;
      this.diffPassword = false;
      this.wrongCheck = false;
    } else if (this.newUser.password !== this.repeatPassword){
      this.diffPassword = true;
      this.wrongCheck = false;
      this.wrongName = false;
    } else{
    this.state = await this.userService.insertNewUserAsync(this.newUser);
    if(!this.state){
      this.wrongName= false;
      this.wrongCheck = true;
      this.diffPassword = false;
    }else{
      this.snackBar.open(this.newUser.name + ' er registrert. Du kan nå logge inn.', ' ', {
        duration: 3000
      })
      this.state ? this.router.navigate(['/']) : this.router.navigate(['/register']);
    }
    }
  };
}
