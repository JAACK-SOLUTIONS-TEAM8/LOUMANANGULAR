import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteStockComponent } from './complete-stock.component';

describe('CompleteStockComponent', () => {
  let component: CompleteStockComponent;
  let fixture: ComponentFixture<CompleteStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
