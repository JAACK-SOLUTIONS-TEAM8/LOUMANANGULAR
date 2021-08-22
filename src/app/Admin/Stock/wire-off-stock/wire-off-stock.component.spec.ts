import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WireOffStockComponent } from './wire-off-stock.component';

describe('WireOffStockComponent', () => {
  let component: WireOffStockComponent;
  let fixture: ComponentFixture<WireOffStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WireOffStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WireOffStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
