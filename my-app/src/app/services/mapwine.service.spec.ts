import { TestBed, inject } from '@angular/core/testing';

import { MapwineService } from './mapwine.service';

describe('MapwineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapwineService]
    });
  });

  it('should be created', inject([MapwineService], (service: MapwineService) => {
    expect(service).toBeTruthy();
  }));
});
