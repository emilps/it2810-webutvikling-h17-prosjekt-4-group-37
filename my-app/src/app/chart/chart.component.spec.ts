import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileService } from './../services/profile.service';
import { FavoriteWineService } from './../services/favoritewine.service';
import { UserService} from './../services/users.service';
import { HttpModule } from '@angular/http';

import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart.component';

import { MatCardModule } from '@angular/material';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChartComponent
      ],
      imports: [
        HttpModule,
        MatCardModule,
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
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
