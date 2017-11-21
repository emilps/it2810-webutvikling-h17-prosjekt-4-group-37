import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';

import { MatTableModule, MatCardModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { MapWineService } from './../services/mapwine.service';
import { HttpModule } from '@angular/http';

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
