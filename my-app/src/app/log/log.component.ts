import { Component, OnInit } from '@angular/core';
import { FavoriteWineService } from './../services/favoritewine.service';
import { UserService } from './../services/users.service';
import {ProfileService} from './../services/profile.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  wines: any;
  constructor(
    private favoriteWineService: FavoriteWineService,
    public userService: UserService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.gatherWinesLog();
  }

  async gatherWinesLog(){
    this.wines = await this.profileService.getWinesLog()
  }
}
