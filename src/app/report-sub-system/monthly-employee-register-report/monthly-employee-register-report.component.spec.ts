import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyEmployeeRegisterReportComponent } from './monthly-employee-register-report.component';

describe('MonthlyEmployeeRegisterReportComponent', () => {
  let component: MonthlyEmployeeRegisterReportComponent;
  let fixture: ComponentFixture<MonthlyEmployeeRegisterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyEmployeeRegisterReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyEmployeeRegisterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
