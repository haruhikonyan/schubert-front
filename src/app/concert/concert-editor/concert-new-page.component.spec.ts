import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcertNewPageComponent } from './concert-new-page.component';

describe('ConcertNewPageComponent', () => {
  let component: ConcertNewPageComponent;
  let fixture: ComponentFixture<ConcertNewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcertNewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
