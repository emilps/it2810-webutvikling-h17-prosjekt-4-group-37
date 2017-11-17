import { Component, OnInit } from '@angular/core';
import { FavoriteWineService } from './../services/favoritewine.service';
import { UserService } from './../services/users.service';

@Component({
  selector: 'app-users-wines',
  templateUrl: './users-wines.component.html',
  styleUrls: ['./users-wines.component.css']
})
export class UsersWinesComponent implements OnInit {

  username = "";

  wines: any;
  constructor(private favoriteWineService: FavoriteWineService,
    public userService: UserService,
  ) { }

  async ngOnInit() {
    //this.userService.fetchUserAsync().then(data => this.username = data.name);
    this.userService.fetchUserAsync()
    this.username = this.userService.user.name;
    await this.gatherWines();
    //console.log("This was called: ", this.wines)

  }

  async gatherWines(){
    await this.favoriteWineService.getFavoriteWines()
    .subscribe(res => {
      this.wines = res
    })
  }
}
