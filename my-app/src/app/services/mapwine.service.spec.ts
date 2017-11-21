import { TestBed, inject } from '@angular/core/testing';
import { MapWineService } from './mapwine.service';

import { HttpModule } from '@angular/http';

describe('MapWineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [

      ],
      imports: [
        HttpModule,
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
