import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberFormComponent } from './team-member-form.component';

describe('TeamMemberFormComponent', () => {
  let component: TeamMemberFormComponent;
  let fixture: ComponentFixture<TeamMemberFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMemberFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
