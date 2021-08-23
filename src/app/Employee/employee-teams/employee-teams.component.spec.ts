import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTeamsComponent } from './employee-teams.component';

describe('EmployeeTeamsComponent', () => {
  let component: EmployeeTeamsComponent;
  let fixture: ComponentFixture<EmployeeTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
