import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryTypeDetailComponent } from './enquiry-type-detail.component';

describe('EnquiryTypeDetailComponent', () => {
  let component: EnquiryTypeDetailComponent;
  let fixture: ComponentFixture<EnquiryTypeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryTypeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
