// Angular imports
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
// Components import
import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
// Service imports
import { UserService } from './../services/users.service';
import { FavoriteWineService } from './../services/favoritewine.service';
import { ProfileService } from './../services/profile.service';
import { MessageService } from './../services/message.service';
// Design imports from material
import { MatDialogRef, MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
// Filter import
import { Filter } from './../model/single-wine';

@Component({
  selector: 'app-single-wine',
  templateUrl: './single-wine.component.html',
  styleUrls: ['./single-wine.component.css']
})

export class SingleWineComponent implements OnInit, AfterViewInit {
  // Defines icon, position of tooltip and the userLoggedIn state
  public icon = 'star_border';
  public position = 'above';
  private userLoggedIn = false;
  // Defines result for storing if the wine is favorite
  result: any;

  // Defines basics for the progress spinner
  alcohol = 1;
  volum = 0.75;
  volumpercent = 0;

  // Defines filter for checking is the wine is a favorite or it should ad it.
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
    public dialog: MatDialog,
    public profileService: ProfileService,
    private MessageService: MessageService
    ) {
      try {
        this.newFilter.username = this.userService.user.name;
        this.newFilter.wine = data["Varenummer"];
        this.result = [];
      } catch(err) {
        console.log(err);
      }
      this.formatVolume(data["Volum"]);
      this.checkWine();
    }

   async ngOnInit() {
     // Trigger animation after the component is loaded
     setTimeout(() => this.alcohol = ((100/22) * this.data["Alkohol"]), 500);
     setTimeout(() => this.volumpercent = this.formatVolume(this.data["Volum"]), 500);

     // Checks if the user is logged in and adds the wine to the log
     await this.userService.fetchUserAsync()
        if (this.userService.isLoggedIn()){
          this.userLoggedIn = true;
          this.addToLog();
        } else {
          this.userLoggedIn = false;
        }
    }


  // Transform the liter to a number between 0 - 100
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
  }


  addToLog(){
    console.log("addtolog kjører")
    this.profileService.addToLog(this.newFilter)
      .subscribe(res => console.log(res));
    console.log("done")
  }

  // Changes the star icon from outlined to full based on the previous state
  async changeIcon(wine,id){
    await this.userService.fetchUserAsync()
    if(this.userLoggedIn){
      if(this.icon == "star"){
        this.icon = "star_border";
        this.newFilter.remove = 1;
        this.snackBar.open((wine + " er fjernet fra favoritter"),"OK", {
          duration: 1000,
        });
        //remove wine here from profilesite, if on that page
      }else{
        this.icon = "star";
        this.newFilter.remove = 0;
        this.snackBar.open((wine + " er lagret i favoritter"),"OK", {
          duration: 1000,
        });
      }
      this.updateWine();
      this.updateFavoriteWines();
    }else{
      // Opens login dialog
      this.openDialog();
    }
  }

  updateFavoriteWines(): void {
      //send ID to be removed to messageservice
      this.MessageService.updateFavoriteWines(this.newFilter.wine.toString())
    }
  // Checks if the wine is in users favorite list
  async checkWine(){
    await this.userService.fetchUserAsync()
    if (this.userService.isLoggedIn()) {
    await this.favoriteWineService.getFavoriteWine(this.newFilter)
        .subscribe(res => this.firstCheckIfFavorite(res));
    }
    else {
      this.result = ""
    }
  }

  // Changes the star to full star if the wine is favorited
  firstCheckIfFavorite(dbData){
    this.result = dbData;
    if (this.result.length) {
      this.icon = "star";
    }
  }

  // Opens the login dialog and closes single-wine dialog
  openDialog(): void {
    this.thisDialogRef.close("Cancel");
    let dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '500px',
      data: ""
    });
  }

  openSnackBar() {
  }

  // Updates the favoritewine collection with new result
  updateWine(){
    this.favoriteWineService.updateFavoriteWine(this.newFilter)
        .subscribe();
  }

  // Closes the dialog
  onCloseConfirm(){
    this.thisDialogRef.close("Confirm")
  }

  // Closes the dialog
  onCloseCancel(){
    this.thisDialogRef.close("Cancel")
  }
}
