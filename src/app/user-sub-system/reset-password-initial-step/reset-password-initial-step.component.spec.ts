import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordInitialStepComponent } from './reset-password-initial-step.component';

describe('ResetPasswordInitialStepComponent', () => {
  let component: ResetPasswordInitialStepComponent;
  let fixture: ComponentFixture<ResetPasswordInitialStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordInitialStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordInitialStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
