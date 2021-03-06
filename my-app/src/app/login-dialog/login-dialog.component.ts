import { Component, OnInit, Inject } from '@angular/core';
//Import our Components
import { LoginComponent } from './../login/login.component';
import { RegisterComponent } from './../register/register.component';
//Import Angular Material items
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  //Init of material comp with LoginDialogComponent
  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
