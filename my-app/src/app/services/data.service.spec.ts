import { TestBed, inject } from '@angular/core/testing';
import { DataService } from './data.service';
//Import Http Module
import { HttpModule } from '@angular/http';
//Import our Services
import { ProfileService } from './services/profile.service';
import { FavoriteWineService } from './services/favoritewine.service';
import { UserService} from './services/users.service';
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
  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
