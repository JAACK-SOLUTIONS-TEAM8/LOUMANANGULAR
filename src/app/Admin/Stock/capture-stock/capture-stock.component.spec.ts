import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureStockComponent } from './capture-stock.component';

describe('CaptureStockComponent', () => {
  let component: CaptureStockComponent;
  let fixture: ComponentFixture<CaptureStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptureStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
