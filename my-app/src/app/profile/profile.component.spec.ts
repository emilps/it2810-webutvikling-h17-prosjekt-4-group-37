import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProfileComponent } from './profile.component';
//Import Router, Routes and Http modules
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
//Import our Components
import { LoginComponent } from './../login/login.component';
import { RegisterComponent } from './../register/register.component';
import { NavbarComponent } from './../navbar/navbar.component';
import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';
import { WineSearchComponent } from './../wine-search/wine-search.component';
import { LogComponent } from './../log/log.component';
import { MapComponent } from './../map/map.component';
import { SingleWineComponent } from './../single-wine/single-wine.component';
import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { UsersWinesComponent } from './../users-wines/users-wines.component';
import { ChartComponent } from './../chart/chart.component';
//Import our Services
import { ProfileService } from './../services/profile.service';
import { FavoriteWineService } from './../services/favoritewine.service';
import { UserService} from './../services/users.service';
import { AuthGuard } from './../auth-guard.service';
import { MessageService } from './../services/message.service';
//Import Chart for doughnut/pie chart
import { ChartsModule } from 'ng2-charts';
//Import Angular Material Modules, Forms and Animations
import { MatCardModule, MatTooltipModule , MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatMenuModule, MatExpansionModule, MatCheckboxModule, MatFormFieldModule, MatTableModule, MatProgressSpinnerModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Import Base URL
import { APP_BASE_HREF } from '@angular/common';
//MatDialogRef Mock
class MdDialogRefMock {
}
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
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let debugElement:      DebugElement;
  let htmlElement:      HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginDialogComponent,
        LoginComponent,
        RegisterComponent,
        NavbarComponent,
        PageNotFoundComponent,
        WineSearchComponent,
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
        HttpModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatTooltipModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatMenuModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatTableModule,
        MatProgressSpinnerModule,
        ChartsModule,
        MatSnackBarModule,
        MatSelectModule,
        MatInputModule,
      ],
      providers: [
        { provide: MatDialogRef, useClass: MdDialogRefMock },
        { provide: MAT_DIALOG_DATA },
        {provide: APP_BASE_HREF, useValue: '/'},
        ProfileService,
        UserService,
        FavoriteWineService,
        NavbarComponent,
        MessageService,
      ],
    })
    .compileComponents();
  }));
  beforeEach(() => {

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    component.name = "wine"
    component.newFilter.wineType = "Rødvin";
    component.newFilter.wineContry= "Tyskland";
    fixture.detectChanges();

  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should display an empty username', () =>{
    const empty= ' '
    expect(component.userName).toEqual(empty);
  })
  it('should display name, wine', () =>{
    component.showWine = true;
    component.allElements = true;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.rec-wine-name'))
    htmlElement = debugElement.nativeElement;
    expect(component.name).toEqual(htmlElement.textContent);
  })
  it('Validates allElements, showWine and statusRcommendation to true',() => {
    component.allElements = false;
    component.wines = [0,0,0]
    component.checkProfile()
    fixture.detectChanges();
    expect(component.allElements).toEqual(true);
    expect(component.showWine).not.toEqual(false);
    expect(component.statusRcommendation).toEqual(true);
  })
  it("Validates allElements to true, but showWine and statusRcommendation to false", () => {
    component.allElements = false;
    component.wines = [0,0]
    component.checkProfile()
    fixture.detectChanges();
    expect(component.allElements).toEqual(true);
    expect(component.showWine).not.toEqual(true);
    expect(component.statusRcommendation).toEqual(false);
  })

});
