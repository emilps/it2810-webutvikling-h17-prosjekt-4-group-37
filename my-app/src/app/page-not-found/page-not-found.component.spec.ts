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
  it('should create 404 page', () => {
    expect(component).toBeTruthy();
  });
  it('should create 404 text', () => {
    let de = fixture.debugElement.query(By.css('.front'));
    let el = de.nativeElement;
    expect(el.textContent).toContain('404');
  });
  it('Image should load', () => {
    let de = fixture.debugElement.query(By.css('img'));
    let el = de.nativeElement;
    expect(el.alt).toContain('drunk404');
  });
});
