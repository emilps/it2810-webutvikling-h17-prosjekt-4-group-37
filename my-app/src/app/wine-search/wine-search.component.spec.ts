import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WineSearchComponent } from './wine-search.component';

import { HttpModule } from '@angular/http';
import { FavoriteWineService } from './../services/favoritewine.service';
import { UserService } from './../services/users.service';
import { SingleWineComponent } from './../single-wine/single-wine.component';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from './../services/message.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './../data.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatCardModule, MatProgressSpinnerModule, MatIconModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule, MatSnackBarModule, MatExpansionModule, MatCheckboxModule } from '@angular/material';

describe('WineSearchComponent', () => {
  let component: WineSearchComponent;
  let fixture: ComponentFixture<WineSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WineSearchComponent,
        SingleWineComponent,
      ],
      imports: [
        HttpModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatCheckboxModule,
        FormsModule,
      ],
      providers: [
        UserService,
        FavoriteWineService,
        MessageService,
        DataService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    //fixture = TestBed.createComponent(WineSearchComponent);
    //component = fixture.debugElement.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
  });
});
