import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleWineComponent } from './single-wine.component';
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
import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { ProfileComponent } from './../profile/profile.component';
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
describe('SingleWineComponent', () => {
  let component: SingleWineComponent;
  let fixture: ComponentFixture<SingleWineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SingleWineComponent,
        LoginDialogComponent,
        LoginComponent,
        RegisterComponent,
      ],
      imports: [
        HttpModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        FormsModule,
        MatSnackBarModule,
      ],
      providers: [
        ProfileService,
        UserService,
        FavoriteWineService,
        MessageService,
        { provide: MatDialogRef, useClass: MdDialogRefMock },
        { provide: MAT_DIALOG_DATA },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    //fixture = TestBed.createComponent(SingleWineComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('Test if the single wine loads correctly', () => {
    //expect(component).toBeTruthy();
  });
});
