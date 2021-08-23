import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTeamDetailComponent } from './employee-team-detail.component';

describe('EmployeeTeamDetailComponent', () => {
  let component: EmployeeTeamDetailComponent;
  let fixture: ComponentFixture<EmployeeTeamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTeamDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTeamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
