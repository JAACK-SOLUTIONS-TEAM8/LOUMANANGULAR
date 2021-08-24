import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyStockReportComponent } from './monthly-stock-report.component';

describe('MonthlyStockReportComponent', () => {
  let component: MonthlyStockReportComponent;
  let fixture: ComponentFixture<MonthlyStockReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyStockReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyStockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
