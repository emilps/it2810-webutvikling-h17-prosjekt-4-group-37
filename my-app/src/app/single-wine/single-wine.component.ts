import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { UserService } from './../services/users.service';
import { LoginDialogComponent } from './../login-dialog/login-dialog.component';

@Component({
  selector: 'app-single-wine',
  templateUrl: './single-wine.component.html',
  styleUrls: ['./single-wine.component.css']
})
export class SingleWineComponent implements OnInit {

  public icon = 'star_border';
  public position = 'above';
  private userLoggedIn = false

  constructor(
    public thisDialogRef: MatDialogRef<SingleWineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public snackBar: MatSnackBar,
    private userService: UserService,
    public dialog: MatDialog) {
      this.userLoggedIn = this.userService.isLoggedIn()
    }

  ngOnInit() {
  }

  changeIcon(wine){
    console.log(this.userLoggedIn)
    if(this.userLoggedIn){
      if(this.icon == "star"){
        this.icon = "star_border";
        this.snackBar.open((wine + " er fjernet fra favoritter"),"OK", {
          duration: 2000,
        });
      }else{
        this.icon = "star";
        this.snackBar.open((wine + " er lagret i favoritter"),"OK", {
          duration: 2000,
        });
      }
    }else{
      this.openDialog();
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '500px',
      data: "Test tekst"
    });
  }

  openSnackBar() {

  }

  onCloseConfirm(){
    this.thisDialogRef.close("Confirm")
  }

  onCloseCancel(){
    this.thisDialogRef.close("Cancel")

  }

}
