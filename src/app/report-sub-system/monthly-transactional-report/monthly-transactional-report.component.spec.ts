import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyTransactionalReportComponent } from './monthly-transactional-report.component';

describe('MonthlyTransactionalReportComponent', () => {
  let component: MonthlyTransactionalReportComponent;
  let fixture: ComponentFixture<MonthlyTransactionalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyTransactionalReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyTransactionalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
