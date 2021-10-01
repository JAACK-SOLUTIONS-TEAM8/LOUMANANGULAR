import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerConfigurationComponent } from './timer-configuration.component';

describe('TimerConfigurationComponent', () => {
  let component: TimerConfigurationComponent;
  let fixture: ComponentFixture<TimerConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
