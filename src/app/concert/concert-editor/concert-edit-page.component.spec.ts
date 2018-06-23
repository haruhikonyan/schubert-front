import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertEditPageComponent } from './concert-edit-page.component';

describe('ConcertEditPageComponent', () => {
  let component: ConcertEditPageComponent;
  let fixture: ComponentFixture<ConcertEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcertEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
