import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeeProfileComponent } from './update-employee-profile.component';

describe('UpdateEmployeeProfileComponent', () => {
  let component: UpdateEmployeeProfileComponent;
  let fixture: ComponentFixture<UpdateEmployeeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmployeeProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmployeeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
