import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitCanonicalHomeComponent } from './recruit-canonical-home.component';

describe('RecruitCanonicalHomeComponent', () => {
  let component: RecruitCanonicalHomeComponent;
  let fixture: ComponentFixture<RecruitCanonicalHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitCanonicalHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitCanonicalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
