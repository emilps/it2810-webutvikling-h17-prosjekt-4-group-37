import { TestBed, inject } from '@angular/core/testing';
import { MapWineService } from './mapwine.service';
//Import HttpModule
import { HttpModule } from '@angular/http';
/* Test setup and execution */
describe('MapWineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpModule
      ],
      providers: [
        MapWineService
      ],
    });
  });
  it('should be created', inject([MapWineService], (service: MapWineService) => {
    expect(service).toBeTruthy();
  }));
});
