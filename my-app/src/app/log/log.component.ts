import { Component, OnInit } from '@angular/core';
//Import of services
import { FavoriteWineService } from './../services/favoritewine.service';
import { UserService } from './../services/users.service';
import { ProfileService } from './../services/profile.service';
//Import of component
import { SingleWineComponent } from './../single-wine/single-wine.component';
//Import of design from material UI
import { MatDialog } from '@angular/material';


@Component({
	selector: 'app-log',
	templateUrl: './log.component.html',
	styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  //State based on if there are wines in the log
	showLog = true;
  //List of wines from log.
	wines: any;
  //Positioning of hover text.
	tooltipPosition = "above";

  //Initializes services and dialog box from material.
	constructor(
		private favoriteWineService: FavoriteWineService,
		public userService: UserService,
		private profileService: ProfileService,
		public dialog: MatDialog,
	) { }

  //On init runs gatherWinesLog function
	ngOnInit() {
		this.gatherWinesLog();
	}
  /* Gathers wines based on log.
  	If list is not empty changes showLog state. */
	async gatherWinesLog() {
		this.wines = await this.profileService.getWinesLog()
		if (this.wines.length) {
			this.showLog = false;
		}
	}
  //Opens material dialog type SingleWineComponent
	openDialog(arg) {
		let dialogRef = this.dialog.open(SingleWineComponent, {
			data: arg,
		})
		dialogRef.afterClosed().subscribe()
	}
}
