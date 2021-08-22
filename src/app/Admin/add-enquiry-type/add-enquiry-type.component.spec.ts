import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnquiryTypeComponent } from './add-enquiry-type.component';

describe('AddEnquiryTypeComponent', () => {
  let component: AddEnquiryTypeComponent;
  let fixture: ComponentFixture<AddEnquiryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEnquiryTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEnquiryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
