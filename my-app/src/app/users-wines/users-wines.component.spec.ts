import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersWinesComponent } from './users-wines.component';
//Import Http Module
import { HttpModule } from '@angular/http';
//Import our Component(s)
import { SingleWineComponent } from './../single-wine/single-wine.component';
//Import our Services
import { FavoriteWineService } from './../services/favoritewine.service';
import { UserService } from './../services/users.service';
import { MessageService } from './../services/message.service';
//Import Angular Material Modules
import { MatCardModule, MatProgressSpinnerModule, MatIconModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
/* Test setup and execution */
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
  it('Test if the users wines loads correctly', () => {
    expect(component).toBeTruthy();
  });
});
