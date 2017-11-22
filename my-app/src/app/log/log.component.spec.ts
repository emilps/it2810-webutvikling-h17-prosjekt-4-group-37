import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LogComponent } from './log.component';
//Import Http Module
import { HttpModule } from '@angular/http';
//Import our Services
import { ProfileService } from './../services/profile.service';
import { FavoriteWineService } from './../services/favoritewine.service';
import { UserService} from './../services/users.service';
//Import Angular Material Modules
import { MatCardModule, MatTooltipModule , MatDialogModule} from '@angular/material';
/* Test setup and execution */
describe('LogComponent', () => {
  let component: LogComponent;
  let fixture: ComponentFixture<LogComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LogComponent
      ],
      imports: [
        HttpModule,
        MatCardModule,
        MatTooltipModule,
        MatDialogModule
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
    fixture = TestBed.createComponent(LogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('Test if the log component loads correctly', () => {
    expect(component).toBeTruthy();
  });
});
