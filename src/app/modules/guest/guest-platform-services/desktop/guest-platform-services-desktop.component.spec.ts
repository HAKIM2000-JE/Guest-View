import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPlatformServicesDesktopComponent } from './guest-platform-services-desktop.component';

describe('GuestPlatformServicesDesktopComponent', () => {
  let component: GuestPlatformServicesDesktopComponent;
  let fixture: ComponentFixture<GuestPlatformServicesDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestPlatformServicesDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPlatformServicesDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
