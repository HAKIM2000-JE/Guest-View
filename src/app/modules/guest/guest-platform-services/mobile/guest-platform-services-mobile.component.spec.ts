import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPlatformServicesMobileComponent } from './guest-platform-services-mobile.component';

describe('GuestPlatformServicesMobileComponent', () => {
  let component: GuestPlatformServicesMobileComponent;
  let fixture: ComponentFixture<GuestPlatformServicesMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestPlatformServicesMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPlatformServicesMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
