import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { UserService } from './../services/users.service';
import { FavoriteWineService } from './../services/favoritewine.service';
import { Filter } from './winefilter';
import { LoginDialogComponent } from './../login-dialog/login-dialog.component';


@Component({
  selector: 'app-single-wine',
  templateUrl: './single-wine.component.html',
  styleUrls: ['./single-wine.component.css']
})
export class SingleWineComponent implements OnInit, AfterViewInit {

  public icon = 'star_border';
  public position = 'above';
  private userLoggedIn = false

  result: any;
  alcohol = 1;
  volum = 0.75;
  volumpercent = 0;


  newFilter: Filter = {
    wine: "",
    username: "",
    remove: 0
  };

  constructor(
    private favoriteWineService: FavoriteWineService,
    public thisDialogRef: MatDialogRef<SingleWineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public snackBar: MatSnackBar,
    private userService: UserService,
    public dialog: MatDialog

    ) {
    console.log("this.userservice.user = " + this.userService.user.name)


      try{
        //this.userService.fetchUserAsync()
        this.newFilter.username = this.userService.user.name;
        this.newFilter.wine = data["Varenummer"];
        //console.log("Filter check", this.newFilter)
        this.result = []
      }catch(err){
        //console.log("Note loggeed in")
      }
      //this.checkWine();
      //console.log(this.result)
      this.formatVolume(data["Volum"])
      this.checkWine();

    }

     async ngOnInit() {
       setTimeout(() => this.alcohol = ((100/22) * this.data["Alkohol"]), 500);
       setTimeout(() => this.volumpercent = this.formatVolume(this.data["Volum"]), 500);

      await this.userService.fetchUserAsync()
        if (this.userService.isLoggedIn()){
          this.userLoggedIn = true;

        } else {
          this.userLoggedIn = false;
        }
    }



  formatVolume(volume){
    if(volume == 0){
      this.volum = 0.75
      return 0.75*20
    }else if (volume == 1){
      this.volum = 1.5
      return 1.5*20
    }else{
      this.volum = volume
      return volume*20;
    }
  }





  ngAfterViewInit() {
    this.checkResult();
    if(document.querySelector('.starIcon').innerHTML == "star_border"){
      //this.checkWine();
      //this.checkResult();
      //console.log(document.querySelector('.starIcon'))
      document.querySelector('.starIcon');
      //console.log(this.result)
    }
  }


  async changeIcon(wine,id){

    await this.userService.fetchUserAsync()
    if(this.userLoggedIn){

      if(this.icon == "star"){
        this.icon = "star_border";
        this.newFilter.remove = 1;
        this.snackBar.open((wine + " er fjernet fra favoritter"),"OK", {
          duration: 1000,
        });
      }else{
        this.icon = "star";
        this.newFilter.remove = 0;
        this.snackBar.open((wine + " er lagret i favoritter"),"OK", {
          duration: 1000,
        });
      }
      this.updateWine();
    }else{
      this.openDialog();
    }
    //console.log("result", this.result, " Newfilter ", this.newFilter)
  }



  checkResult(){
    //console.log(this.result)
  }

  async checkWine(){
    await this.userService.fetchUserAsync()
    if (this.userService.isLoggedIn()) {
    await this.favoriteWineService.getFavoriteWine(this.newFilter)
        .subscribe(res => this.firstCheckIfFavorite(res));
    }

    else {
      this.result = ""
    }
    //console.log("This was called", this.result)
  }

  firstCheckIfFavorite(dbData){
    this.result = dbData;
    if(this.result.length){
      this.icon = "star";
    }
    //console.log("DB_DATA: ", dbData);
  }

  openDialog(): void {
    this.thisDialogRef.close("Cancel")
    let dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '500px',
      data: "Test tekst"
    });
  }

  openSnackBar() {

  }

  updateWine(){
    this.favoriteWineService.updateFavoriteWine(this.newFilter)
        .subscribe(res => console.log(res));
  }



  onCloseConfirm(){
    this.thisDialogRef.close("Confirm")
  }

  onCloseCancel(){
    this.thisDialogRef.close("Cancel")

  }

}
