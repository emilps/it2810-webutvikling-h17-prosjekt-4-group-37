import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-single-wine',
  templateUrl: './single-wine.component.html',
  styleUrls: ['./single-wine.component.css']
})
export class SingleWineComponent implements OnInit {

  public icon = 'star_border';
  public position = 'above';

  constructor(public thisDialogRef: MatDialogRef<SingleWineComponent>, @Inject(MAT_DIALOG_DATA) public data: string, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  changeIcon(wine){
    console.log(wine)
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
