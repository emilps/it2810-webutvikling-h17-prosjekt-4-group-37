import { TestBed, inject } from '@angular/core/testing';
import { DataService } from './data.service';
//Import Http Module
import { HttpModule } from '@angular/http';
//Import our Services
import { ProfileService } from './profile.service';
import { FavoriteWineService } from './favoritewine.service';
import { UserService} from './users.service';
/* Test setup and execution */
describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpModule,
      ],
      providers: [
        DataService
      ],
    });
  });
  it('Tests if the service works', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
