// Angular imports
import { Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import { Router } from '@angular/router';
//Import our LoginDialogComponent
import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
// Service import
import { UserService} from '../services/users.service';
import { MessageService } from './../services/message.service';
// Filter import
import { User } from '../model/user';
// Subscription import
import { Subscription } from 'rxjs/Subscription';
// Dialog imports
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserService]

})
export class NavbarComponent implements OnInit, OnDestroy {
  //State for button to show.
  public loggedInOptions = false;
  private subscription: Subscription;
  constructor(private router: Router, public dialog: MatDialog,private userService: UserService, private zone: NgZone, private messageService: MessageService){
      // subscribe to home component messages
      this.subscription = this.messageService.changeButtonAlert().subscribe(message => {
        this.loggedInOptions= true;
      });
   }
   //Checks if user is logged in. Changes button to correct state.
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
  //Changes state for button
  login(){
    this.loggedInOptions = true;
  }
  //When log out button is pressed user is logged out and button changes back to login button
  logOut(){
    this.userService.logOutUser();
    this.loggedInOptions = false;
    this.router.navigate(['']);
  }
  //Opens login-dialog component
  openDialog(): void {
    let dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '500px',
      data: "Test tekst"
    })
  }
}
