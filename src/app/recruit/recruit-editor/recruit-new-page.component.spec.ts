import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitNewPageComponent } from './recruit-new-page.component';

describe('RecruitNewPageComponent', () => {
  let component: RecruitNewPageComponent;
  let fixture: ComponentFixture<RecruitNewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitNewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
