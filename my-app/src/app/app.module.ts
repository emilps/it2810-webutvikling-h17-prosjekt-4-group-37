import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { NavbarComponent } from './navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatCheckboxModule, MatExpansionModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonToggleModule, MatSnackBarModule, MatTooltipModule, MatTabsModule } from '@angular/material';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WineSearchComponent } from './wine-search/wine-search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { UserService} from './services/users.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MapComponent } from './map/map.component';
import { SingleWineComponent } from './single-wine/single-wine.component';


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
    SingleWineComponent
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
    MatTabsModule
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
