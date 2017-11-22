import { TestBed, inject } from '@angular/core/testing';
import { DataService } from './data.service';

import { ProfileService } from './services/profile.service';
import { FavoriteWineService } from './services/favoritewine.service';
import { UserService} from './services/users.service';
import { HttpModule } from '@angular/http';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [

      ],
      imports: [
        HttpModule,
      ],
      providers: [
        DataService
      ],
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
