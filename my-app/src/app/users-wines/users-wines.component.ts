import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoriteWineService } from './../services/favoritewine.service';
import { UserService } from './../services/users.service';
import { SingleWineComponent } from './../single-wine/single-wine.component';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from './../services/message.service';



@Component({
  selector: 'app-users-wines',
  templateUrl: './users-wines.component.html',
  styleUrls: ['./users-wines.component.css']
})
export class UsersWinesComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  username = "";
  hasWines= false;
  wines: any;
  constructor(
    private favoriteWineService: FavoriteWineService,
    public userService: UserService,
    public dialog: MatDialog,
    private messageService: MessageService,


  ) { 

      this.subscription = this.messageService.receiveID().subscribe(message => {
        // message is ID: remove that list
        console.log(this.wines)


        let newWines = this.wines.filter(function(item) {
        //console.log(item.varenummer,message.text)

          return item.Varenummer !== message.text
        })

        /*for (let i= 0; i > this.wines.length; i++){
           if (this.wines[i].varenummer ==)
        }*/

        this.wines = newWines
        console.log(this.wines)
      });
    }

  async ngOnInit() {
    //this.userService.fetchUserAsync().then(data => this.username = data.name);
    this.userService.fetchUserAsync()
    this.username = this.userService.user.name;
    await this.gatherWines();

    //console.log("This was called: ", this.wines)

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    console.log(this.wines)
    let dialogRef = this.dialog.open(SingleWineComponent, {
      //width: '600px',
      data: arg,
    })
    dialogRef.afterClosed().subscribe(result => console.log(result))
  }
}
