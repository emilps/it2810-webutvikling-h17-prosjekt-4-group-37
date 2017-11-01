import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { NavbarComponent } from './navbar/navbar.component';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';

import { UserService} from './services/users.service';
=======
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule } from '@angular/material';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WineSearchComponent } from './wine-search/wine-search.component';

const appRoutes: Routes = [
  {
    path: '',
    component: WineSearchComponent
  },
  {
    path: 'navbar',
    component: NavbarComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];
>>>>>>> 6204656bd744fd3cdf1d6962499128f788729b0b

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
<<<<<<< HEAD
    LoginComponent,
    RegisterComponent
=======
    PageNotFoundComponent,
    WineSearchComponent
>>>>>>> 6204656bd744fd3cdf1d6962499128f788729b0b
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpModule,
<<<<<<< HEAD
    FormsModule
=======
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule
>>>>>>> 6204656bd744fd3cdf1d6962499128f788729b0b
  ],

  providers: [
    DataService,
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
