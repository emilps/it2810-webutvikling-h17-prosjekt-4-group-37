import { Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { UserService} from '../services/users.service';
import { User } from '../model/user';
import { MessageService } from './../services/message.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserService]

})
export class NavbarComponent implements OnInit, OnDestroy {

  public loggedInOptions = false;

  private subscription: Subscription;


  constructor(public dialog: MatDialog,private userService: UserService, private zone: NgZone, private messageService: MessageService){
      // subscribe to home component messages
      this.subscription = this.messageService.getMessage().subscribe(message => {
        this.loggedInOptions= true;
      });
   }

  async ngOnInit() {
    await this.userService.fetchUserAsync()
    if (this.userService.isLoggedIn()) {
      this.loggedInOptions = true;
    } else {
      this.loggedInOptions = false;
    }
  }



  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }


  login(){
    this.loggedInOptions = true;
  }

  logOut(){
    this.userService.logOutUser();
    this.loggedInOptions = false;
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '500px',
      data: "Test tekst"
    })
  }
}
