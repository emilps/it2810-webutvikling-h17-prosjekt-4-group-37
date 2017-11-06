import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-single-wine',
  templateUrl: './single-wine.component.html',
  styleUrls: ['./single-wine.component.css']
})
export class SingleWineComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<SingleWineComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  onCloseConfirm(){
    this.thisDialogRef.close("Confirm")
  }

  onCloseCancel(){
    this.thisDialogRef.close("Cancel")

  }

}
