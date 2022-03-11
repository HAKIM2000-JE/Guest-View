import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileGuestBookingDetailsComponent } from './mobile-guest-booking-details.component';

describe('MobileGuestBookingDetailsComponent', () => {
  let component: MobileGuestBookingDetailsComponent;
  let fixture: ComponentFixture<MobileGuestBookingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileGuestBookingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileGuestBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
