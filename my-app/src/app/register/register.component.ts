import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService} from '../services/users.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  newUser: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.newUser = User.CreateDefault();
  }

  insertNewUser() {
    console.log(this.newUser.password);
    this.userService
    .insertNewUser(this.newUser)
    .subscribe(
      data => {
         this.newUser = User.CreateDefault();

         console.log("Added user.");
      }
    )
  }


}
