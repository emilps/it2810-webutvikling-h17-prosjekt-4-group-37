import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
//Import Http Module
import { HttpModule } from '@angular/http';
//Import our Service
import { MapWineService } from './../services/mapwine.service';
//Import Angular Material Module
import { MatTableModule, MatCardModule, MatTooltipModule, MatDialogModule } from '@angular/material';
/* Test setup and execution */
describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapComponent
      ],
      imports: [
        HttpModule,
        MatTableModule,
        MatCardModule,
        MatTooltipModule,
        MatDialogModule,
      ],
      providers: [
        MapWineService,
      ],
    })
    .compileComponents();
  }));
  beforeEach(() => {
    //fixture = TestBed.createComponent(MapComponent);
    //component = fixture.debugElement.componentInstance;
    //fixture.detectChanges();
  });
  it('should create', () => {
    //expect(component).toBeTruthy();
  });
});
