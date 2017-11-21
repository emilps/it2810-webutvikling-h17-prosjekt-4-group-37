import { TestBed, inject } from '@angular/core/testing';

import { MapWineService } from './mapwine.service';

describe('MapWineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapWineService]
    });
  });

  it('should be created', inject([MapWineService], (service: MapWineService) => {
    expect(service).toBeTruthy();
  }));
});
