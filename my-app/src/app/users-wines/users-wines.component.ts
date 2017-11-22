import { Component, OnInit, OnDestroy } from '@angular/core';
//Import our SinglewWineComponent
import { SingleWineComponent } from './../single-wine/single-wine.component';
//Import our Services
import { FavoriteWineService } from './../services/favoritewine.service';
import { UserService } from './../services/users.service';
import { MessageService } from './../services/message.service';
//Import Angular Material Dialog
import { MatDialog } from '@angular/material';
//Import subscription to listen to service
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-users-wines',
  templateUrl: './users-wines.component.html',
  styleUrls: ['./users-wines.component.css']
})
export class UsersWinesComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  username = "";
  hasWines = false;
  wines: any;
  constructor(
    private favoriteWineService: FavoriteWineService,
    public userService: UserService,
    public dialog: MatDialog,
    private messageService: MessageService,
  ) {
      //Removes duplicates to ensure only unique wines
      this.subscription = this.messageService.receiveID().subscribe(message => {

        this.gatherWines();
        console.log(this.wines)

      });
    }
  //Fetches user runs gathersWines
  async ngOnInit() {
    this.userService.fetchUserAsync()
    this.username = this.userService.user.name;
    await this.gatherWines();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  //Gathers favorite wines. If the list is not empty changes state to show wines in html.
  async gatherWines(){
    await this.favoriteWineService.getFavoriteWines()
    .subscribe(res => {
      this.wines = res
      if(this.wines.length){
        this.hasWines = true;
      } else {
        this.hasWines = false;
      }

    })
  }
  //Opens SinleWine dialog with Material Expansion Panel
  openDialog(arg){
    let dialogRef = this.dialog.open(SingleWineComponent, {
      data: arg,
    })
    dialogRef.afterClosed().subscribe()
  }
}
