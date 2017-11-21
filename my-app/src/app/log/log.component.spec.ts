import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LogComponent } from './log.component';

import { ProfileService } from './../services/profile.service';
import { FavoriteWineService } from './../services/favoritewine.service';
import { UserService} from './../services/users.service';
import { HttpModule } from '@angular/http';

import { MatCardModule, MatTooltipModule , MatDialogModule} from '@angular/material';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
