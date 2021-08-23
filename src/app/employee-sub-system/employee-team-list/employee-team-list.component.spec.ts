import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTeamListComponent } from './employee-team-list.component';

describe('EmployeeTeamListComponent', () => {
  let component: EmployeeTeamListComponent;
  let fixture: ComponentFixture<EmployeeTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTeamListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
