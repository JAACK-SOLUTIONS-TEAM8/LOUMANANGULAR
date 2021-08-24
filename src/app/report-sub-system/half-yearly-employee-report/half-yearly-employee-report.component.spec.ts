import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfYearlyEmployeeReportComponent } from './half-yearly-employee-report.component';

describe('HalfYearlyEmployeeReportComponent', () => {
  let component: HalfYearlyEmployeeReportComponent;
  let fixture: ComponentFixture<HalfYearlyEmployeeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HalfYearlyEmployeeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HalfYearlyEmployeeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
