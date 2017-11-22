import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

//Import Http module
import { HttpModule } from '@angular/http';
//Import our Services
import { ProfileService } from './../services/profile.service';
import { FavoriteWineService } from './../services/favoritewine.service';
import { UserService} from './../services/users.service';
//Import Chart for doughnut/pie chart
import { ChartsModule } from 'ng2-charts';
//Import Angular Material Module
import { MatCardModule } from '@angular/material';
/* Test setup and execution */
describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
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
    component = fixture.componentInstance;
    component.wines =[{"Land": "Italia"},{"Land": "Italia"},{"Land": "Italia"},{"Land": "Frankrike"}];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should update dataset to contries with 3 wines to Italia and 1 to Frankrike', () => {
    component.updateChart();
    expect(component.isDataAvailable).toEqual(true);
    expect(component.doughnutChartData[0]).toEqual(3);
    expect(component.doughnutChartData[3]).toEqual(1);
  });
});
