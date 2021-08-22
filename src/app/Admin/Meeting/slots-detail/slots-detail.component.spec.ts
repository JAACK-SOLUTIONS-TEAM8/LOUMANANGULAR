import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotsDetailComponent } from './slots-detail.component';

describe('SlotsDetailComponent', () => {
  let component: SlotsDetailComponent;
  let fixture: ComponentFixture<SlotsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
