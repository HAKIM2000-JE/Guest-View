import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestBookingDetailsComponent } from './guest-booking-details.component';

describe('GuestBookingDetailsComponent', () => {
  let component: GuestBookingDetailsComponent;
  let fixture: ComponentFixture<GuestBookingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestBookingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
