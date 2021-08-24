import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRegisterReportComponent } from './employee-register-report.component';

describe('EmployeeRegisterReportComponent', () => {
  let component: EmployeeRegisterReportComponent;
  let fixture: ComponentFixture<EmployeeRegisterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeRegisterReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRegisterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
