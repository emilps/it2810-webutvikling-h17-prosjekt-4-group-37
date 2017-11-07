import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { NavbarComponent } from './navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatDialogModule, MatTabsModule } from '@angular/material';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WineSearchComponent } from './wine-search/wine-search.component';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { UserService} from './services/users.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
=======
import { MapComponent } from './map/map.component';

>>>>>>> 0cdb82aabd6e9def01e4f48586a5b059d25991c2
const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
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
    MapComponent
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
    FormsModule,
    MatDialogModule,
    MatTabsModule
  ],
  entryComponents: [
    LoginDialogComponent
  ],

  providers: [
    DataService,
    UserService,
    AuthGuard,
    AuthService,
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
