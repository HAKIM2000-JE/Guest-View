import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopGuestBookingDetailsComponent } from './desktop-guest-booking-details.component';

describe('DesktopGuestBookingDetailsComponent', () => {
  let component: DesktopGuestBookingDetailsComponent;
  let fixture: ComponentFixture<DesktopGuestBookingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopGuestBookingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopGuestBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
