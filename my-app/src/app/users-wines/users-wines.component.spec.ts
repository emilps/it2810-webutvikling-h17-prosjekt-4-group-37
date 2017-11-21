import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersWinesComponent } from './users-wines.component';

import { HttpModule } from '@angular/http';
import { FavoriteWineService } from './../services/favoritewine.service';
import { UserService } from './../services/users.service';
import { SingleWineComponent } from './../single-wine/single-wine.component';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from './../services/message.service';

import { MatCardModule, MatProgressSpinnerModule, MatIconModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule, MatSnackBarModule } from '@angular/material';

describe('UsersWinesComponent', () => {
  let component: UsersWinesComponent;
  let fixture: ComponentFixture<UsersWinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UsersWinesComponent,
        SingleWineComponent
      ],
      imports: [
        HttpModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      providers: [
        UserService,
        FavoriteWineService,
        MessageService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersWinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
