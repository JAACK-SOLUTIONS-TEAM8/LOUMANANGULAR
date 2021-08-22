import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsAttendanceHistoryComponent } from './teams-attendance-history.component';

describe('TeamsAttendanceHistoryComponent', () => {
  let component: TeamsAttendanceHistoryComponent;
  let fixture: ComponentFixture<TeamsAttendanceHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsAttendanceHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsAttendanceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
