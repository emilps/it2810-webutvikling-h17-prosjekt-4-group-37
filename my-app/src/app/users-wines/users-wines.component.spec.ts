import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersWinesComponent } from './users-wines.component';

describe('UsersWinesComponent', () => {
  let component: UsersWinesComponent;
  let fixture: ComponentFixture<UsersWinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersWinesComponent ]
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
