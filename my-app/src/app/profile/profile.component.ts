import { Component, OnInit } from '@angular/core';
import { UserService} from '../services/users.service';
import { User } from '../model/user';
import {ProfileService} from './../services/profile.service';
import { FavoriteWineService } from './../services/favoritewine.service';
import { Filter } from './filter';
import { MatDialog } from '@angular/material';
import { SingleWineComponent } from './../single-wine/single-wine.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private favoriteWineService: FavoriteWineService,
    public dialog: MatDialog,
  ) { }
  userName= " ";
  //userWineProfile: any;
  wines: any;
  statusRcommendation= false;
  recommended: any;
  newFilter: Filter= {
    wineType:" ",
    wineContry:" "
  };
    name = ' ';
    price = ' ';
    src = ' ';
  showWine= false


  ngOnInit() {
    this.userService.fetchUserAsync().then(data => this.userName = data.name);
    this.getWineInfo();
  }
  ngAfterViewInit() {

  }

  openDialog(arg){
    console.log(arg)
    let dialogRef = this.dialog.open(SingleWineComponent, {
      //width: '600px',
      data: arg,
    })
    dialogRef.afterClosed().subscribe(result => console.log(result))

  }

  async getWineInfo(){
    await this.favoriteWineService.getFavoriteWines().subscribe(res => {
      this.wines = res
      this.checkProfile();
    });
}



checkProfile(){
  this.updateUsersWineProfile();
  if(this.newFilter.wineType != " " || this.newFilter.wineContry != " "){
    this.statusRcommendation= true;
    this.recommendation();
    this.showWine = true;
  }
}

async recommendation(){
  await this.profileService.getRecom(this.newFilter)
      .then(res => {
        this.recommended = res[0]
        this.name = res[0].Varenavn;
        this.price = res[0].Pris;
        this.src = res[0].Vareurl;
      });
}

updateUsersWineProfile(){
  var red = 0;
  var white = 0;
  for(var i=0; i<this.wines.length; i++){
    if(this.wines[i].Varetype == "Rødvin"){
      red++;
    }else{
      white++;
    }
  }
  if(red > white){
    this.newFilter.wineType = "Rødvin"
  }else{
    this.newFilter.wineType = "Hvitvin"
  }
  var contry= [0,0,0,0];
  for(var i=0; i<this.wines.length; i++){
    if(this.wines[i].Land == 'Italia'){
       contry[0] += 1
    }else if(this.wines[i].Land == 'Tyskland'){
      contry[1] += 1

    }else if(this.wines[i].Land == 'Spania'){
      contry[2] += 1

    }else if(this.wines[i].Land == 'Frankrike'){
      contry[3] += 1
    }
  }
  var current = 0;
  var index = 0
  for(var i=0; i<contry.length; i++){
    if(current < contry[i]){
      current = contry[i];
      index = i;
    }
  }
  if(index == 0){
    this.newFilter.wineContry = "Italia"
  }else if(index == 1){
    this.newFilter.wineContry = "Tyskland"
  }
  else if(index == 2){
    this.newFilter.wineContry = "Spania"
  }else if(index == 3){
    this.newFilter.wineContry = "Frankrike"
  }
}


}
