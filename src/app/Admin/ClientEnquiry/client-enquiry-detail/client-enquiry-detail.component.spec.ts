import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEnquiryDetailComponent } from './client-enquiry-detail.component';

describe('ClientEnquiryDetailComponent', () => {
  let component: ClientEnquiryDetailComponent;
  let fixture: ComponentFixture<ClientEnquiryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientEnquiryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEnquiryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
