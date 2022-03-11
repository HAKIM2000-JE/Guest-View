import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestMessagingComponent } from './guest-messaging.component';

describe('GuestMessagingComponent', () => {
  let component: GuestMessagingComponent;
  let fixture: ComponentFixture<GuestMessagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestMessagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
