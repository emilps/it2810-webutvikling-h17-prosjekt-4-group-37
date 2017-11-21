import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleWineComponent } from './single-wine.component';


import { MatDialogRef, MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { HttpModule } from '@angular/http';
import { UserService } from './../services/users.service';
import { FavoriteWineService } from './../services/favoritewine.service';
import { Filter } from './winefilter';
import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { ProfileService } from './../services/profile.service';
import { MessageService } from './../services/message.service';
import { LoginComponent } from './../login/login.component';
import { RegisterComponent } from './../register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule, MatProgressSpinnerModule, MatIconModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule, MatSnackBarModule } from '@angular/material';

class MdDialogRefMock {
}

describe('SingleWineComponent', () => {
  let component: SingleWineComponent;
  let fixture: ComponentFixture<SingleWineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SingleWineComponent,
        LoginDialogComponent,
        LoginComponent,
        RegisterComponent,
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
        FormsModule,
        MatSnackBarModule,
      ],
      providers: [
        ProfileService,
        UserService,
        FavoriteWineService,
        MessageService,
        { provide: MatDialogRef, useClass: MdDialogRefMock },
        { provide: MAT_DIALOG_DATA },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleWineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
