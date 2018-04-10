import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitFormComponent } from './recruit-form.component';

describe('RecruitFormComponent', () => {
  let component: RecruitFormComponent;
  let fixture: ComponentFixture<RecruitFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
