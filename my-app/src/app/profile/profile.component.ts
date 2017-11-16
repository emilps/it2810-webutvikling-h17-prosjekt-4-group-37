import { Component, OnInit } from '@angular/core';
import { UserService} from '../services/users.service';
import { User } from '../model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }
  userName= " ";

  ngOnInit() {
    this.userService.fetchUserAsync().then(data => this.userName = data.name);
  }

}
