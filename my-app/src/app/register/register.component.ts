import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService} from '../services/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  newUser: User= {
    name:"",
    password:""
  };

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  insertNewUser() {
    console.log(this.newUser.password);
    this.userService
    .insertNewUser(this.newUser)
    .subscribe(
      data => {
            
         console.log("Added user.");
      }
    )
  }


}
