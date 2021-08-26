import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMeetingSlotsComponent } from './client-meeting-slots.component';

describe('ClientMeetingSlotsComponent', () => {
  let component: ClientMeetingSlotsComponent;
  let fixture: ComponentFixture<ClientMeetingSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMeetingSlotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMeetingSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
