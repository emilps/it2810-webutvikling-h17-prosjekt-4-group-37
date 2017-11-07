import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleWineComponent } from './single-wine.component';

describe('SingleWineComponent', () => {
  let component: SingleWineComponent;
  let fixture: ComponentFixture<SingleWineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleWineComponent ]
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
