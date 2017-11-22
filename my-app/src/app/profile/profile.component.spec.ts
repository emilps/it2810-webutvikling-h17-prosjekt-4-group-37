import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
//Import Http Module
import { HttpModule } from '@angular/http';
//Import our Components
import { SingleWineComponent } from './../single-wine/single-wine.component';
import { ChartComponent } from './../chart/chart.component';
import { UsersWinesComponent } from './../users-wines/users-wines.component';
import { LogComponent } from './../log/log.component';
//Import our Services
import { UserService } from '../services/users.service';
import { ProfileService } from './../services/profile.service';
import { FavoriteWineService } from './../services/favoritewine.service';
//Import User and Filter
import { User } from '../model/user';
import { Filter } from './filter';
//Import Chart Module for doughnut/pie chart
import { ChartsModule } from 'ng2-charts';
//Import Angular Material Modules
import { MatDialogModule, MatExpansionModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule, MatCardModule, MatFormFieldModule } from '@angular/material';
/* Test setup and execution */
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent,
        SingleWineComponent,
        ChartComponent,
        UsersWinesComponent,
        LogComponent,
      ],
      imports: [
        HttpModule,
        MatDialogModule,
        MatExpansionModule,
        MatCardModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatFormFieldModule,
        ChartsModule,
      ],
      providers: [
        ProfileService,
        UserService,
        FavoriteWineService,
      ],
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
