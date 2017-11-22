import { TestBed, async } from '@angular/core/testing';
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
import { LogComponent } from './log/log.component';
import { UsersWinesComponent } from './users-wines/users-wines.component';
import { ChartComponent } from './chart/chart.component';
//Import our Services
import { DataService } from './services/data.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { UserService} from './services/users.service';
import { FavoriteWineService } from './services/favoritewine.service';
import { MapWineService } from './services/mapwine.service';
import { MessageService } from './services/message.service';
import { ProfileService } from './services/profile.service';
//Import Chart for doughnut/pie chart
import { ChartsModule } from 'ng2-charts';
//Import Angular Material Modules, Forms and Animations
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatCheckboxModule, MatExpansionModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonToggleModule, MatSnackBarModule, MatTooltipModule, MatTabsModule, MatTableModule,MatProgressSpinnerModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Import Base URL
import { APP_BASE_HREF } from '@angular/common';
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
/* Test setup and execution */
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        {provide: APP_BASE_HREF, useValue: '/'},
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    //expect(app.title).toEqual('Et Glass med Vin');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    //expect(compiled.querySelector('h1').textContent).toContain('Our MongoDB is Workings!');
  }));
});
