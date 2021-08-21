import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientOrderDetailComponent } from './view-client-order-detail.component';

describe('ViewClientOrderDetailComponent', () => {
  let component: ViewClientOrderDetailComponent;
  let fixture: ComponentFixture<ViewClientOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClientOrderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClientOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
