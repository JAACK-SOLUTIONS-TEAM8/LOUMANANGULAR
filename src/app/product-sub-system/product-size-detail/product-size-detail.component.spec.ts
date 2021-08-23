import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSizeDetailComponent } from './product-size-detail.component';

describe('ProductSizeDetailComponent', () => {
  let component: ProductSizeDetailComponent;
  let fixture: ComponentFixture<ProductSizeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSizeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSizeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
