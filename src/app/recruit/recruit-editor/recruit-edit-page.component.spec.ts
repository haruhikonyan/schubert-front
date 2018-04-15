import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitEditPageComponent } from './recruit-edit-page.component';

describe('RecruitEditPageComponent', () => {
  let component: RecruitEditPageComponent;
  let fixture: ComponentFixture<RecruitEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
