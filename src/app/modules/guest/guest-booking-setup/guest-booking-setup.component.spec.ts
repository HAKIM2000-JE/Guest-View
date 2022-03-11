import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestBookingSetupComponent } from './guest-booking-setup.component';

describe('GuestBookingSetupComponent', () => {
  let component: GuestBookingSetupComponent;
  let fixture: ComponentFixture<GuestBookingSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestBookingSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestBookingSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
