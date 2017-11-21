import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

//Import Router, Routes and Http modules
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

//Import our Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WineSearchComponent } from './wine-search/wine-search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MapComponent } from './map/map.component';
import { SingleWineComponent } from './single-wine/single-wine.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersWinesComponent } from './users-wines/users-wines.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Import our Services
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { UserService} from './services/users.service';
import { FavoriteWineService } from './services/favoritewine.service';
import { MapWineService } from './services/mapwine.service';
import { MessageService } from './services/message.service';
import { LogComponent } from './log/log.component';
import { ProfileService } from './services/profile.service';

// chart for doughnut
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';

// Material imports
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatCheckboxModule, MatExpansionModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonToggleModule, MatSnackBarModule, MatTooltipModule, MatTabsModule, MatTableModule,MatProgressSpinnerModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Application Routes
const appRoutes: Routes = [
  {
    path: '',
    component: WineSearchComponent,
  },
  {
    path: 'navbar',
    component: NavbarComponent,
    canActivate: [AuthGuard]
    //Not full functional yet. Make it async maybe?
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

export function startupServiceFactory(userService: UserService): Function {
    return () => userService.fetchUserAsync();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent,
    WineSearchComponent,
    LoginComponent,
    RegisterComponent,
    LoginDialogComponent,
    MapComponent,
    SingleWineComponent,
    ProfileComponent,
    UsersWinesComponent,
    LogComponent,
    ChartComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTabsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    ChartsModule,
  ],
  entryComponents: [
    SingleWineComponent,
    LoginDialogComponent
  ],

  providers: [
    DataService,
    UserService,
    AuthGuard,
    AuthService,
    FavoriteWineService,
    MapWineService,
    NavbarComponent,
    MessageService,
    FavoriteWineService,
    ProfileService,
    {
      // Provider for APP_INITIALIZER
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [UserService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
