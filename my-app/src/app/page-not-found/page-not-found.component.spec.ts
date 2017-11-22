import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageNotFoundComponent } from './page-not-found.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
/* Test setup and execution */
describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('Tests if the PageNotFoundComponent gets created', () => {
    expect(component).toBeTruthy();
  });
  it('Tests if the 404 text get created', () => {
    let de = fixture.debugElement.query(By.css('.front'));
    let el = de.nativeElement;
    expect(el.textContent).toContain('404');
  });
  it('Tests if the Image loads', () => {
    let de = fixture.debugElement.query(By.css('img'));
    let el = de.nativeElement;
    expect(el.alt).toContain('drunk404');
  });
});
