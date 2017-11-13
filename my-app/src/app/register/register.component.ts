import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService} from '../services/users.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  state = false;
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

  async insertNewUser() {
    this.state = await this.userService.insertNewUserAsync(this.newUser);
    if(!this.state){
      this.wrongCheck = true;
    }
    this.state ? this.router.navigate(['/']) : this.router.navigate(['/register']);
  };

  /*async getUser() {
    this.state = await this.userService.getUserAsync(this.newUser);
    this.state ? this.router.navigate(['/navbar']) : this.router.navigate(['/register']);
  }*/


}
