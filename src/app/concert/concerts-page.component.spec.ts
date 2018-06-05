import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertsPageComponent } from './concerts-page.component';

describe('ConcertsPageComponent', () => {
  let component: ConcertsPageComponent;
  let fixture: ComponentFixture<ConcertsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcertsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
