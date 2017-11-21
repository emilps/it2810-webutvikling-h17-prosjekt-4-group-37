import { Component, OnInit } from '@angular/core';
import { FavoriteWineService } from './../services/favoritewine.service';
import { UserService } from './../services/users.service';
import {ProfileService} from './../services/profile.service';
import { SingleWineComponent } from './../single-wine/single-wine.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  showLog = true;
  wines: any;
  tooltipPosition = "above";
  constructor(
    private favoriteWineService: FavoriteWineService,
    public userService: UserService,
    private profileService: ProfileService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    console.log("Shoueld start here first!!_____INIT____")
    this.gatherWinesLog();
    console.log("This is working:::", this.userService.user)
  }

  async gatherWinesLog(){
    console.log("Gathering of log started________START______")
    this.wines = await this.profileService.getWinesLog()
    if(this.wines.length){
      this.showLog = false;
    }
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
