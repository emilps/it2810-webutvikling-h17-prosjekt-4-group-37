import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { LoginComponent } from './../login/login.component';
import { RegisterComponent } from './register.component';

import { ProfileService } from './../services/profile.service';
import { FavoriteWineService } from './../services/favoritewine.service';
import { UserService} from './../services/users.service';
import { HttpModule } from '@angular/http';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent } from './../navbar/navbar.component';
import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';
import { WineSearchComponent } from './../wine-search/wine-search.component';
import { LogComponent } from './../log/log.component';
import { MapComponent } from './../map/map.component';
import { SingleWineComponent } from './../single-wine/single-wine.component';
import { ProfileComponent } from './../profile/profile.component';
import { UsersWinesComponent } from './../users-wines/users-wines.component';
import { AuthGuard } from './../auth-guard.service';
import { ChartComponent } from './../chart/chart.component';

import { ChartsModule } from 'ng2-charts';
import { APP_BASE_HREF } from '@angular/common';
import { MessageService } from './../services/message.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule, MatTooltipModule , MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatMenuModule, MatExpansionModule, MatCheckboxModule, MatFormFieldModule, MatTableModule, MatProgressSpinnerModule, MatSnackBarModule, MatSelectModule, MatInputModule } from '@angular/material';

class MdDialogRefMock {
}

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


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
