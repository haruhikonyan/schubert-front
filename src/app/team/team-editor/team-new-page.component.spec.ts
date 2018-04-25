import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamNewPageComponent } from './team-new-page.component';

describe('TeamNewPageComponent', () => {
  let component: TeamNewPageComponent;
  let fixture: ComponentFixture<TeamNewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamNewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
