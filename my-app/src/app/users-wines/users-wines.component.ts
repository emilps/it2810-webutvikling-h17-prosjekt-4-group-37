import { Component, OnInit } from '@angular/core';
import { FavoriteWineService } from './../services/favoritewine.service';
import { UserService } from './../services/users.service';
import { SingleWineComponent } from './../single-wine/single-wine.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-users-wines',
  templateUrl: './users-wines.component.html',
  styleUrls: ['./users-wines.component.css']
})
export class UsersWinesComponent implements OnInit {

  username = "";
  hasWines= false;
  wines: any;
  constructor(
    private favoriteWineService: FavoriteWineService,
    public userService: UserService,
    public dialog: MatDialog,
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
      if(this.wines.length){
        this.hasWines = true;
      }
    })
  }

  openDialog(arg){
    console.log(arg)
    let dialogRef = this.dialog.open(SingleWineComponent, {
      //width: '600px',
      data: arg,
    })
    dialogRef.afterClosed().subscribe(result => console.log(result))

  }
}
