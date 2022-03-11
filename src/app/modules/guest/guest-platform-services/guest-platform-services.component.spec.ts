import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPlatformServicesComponent } from './guest-platform-services.component';

describe('GuestGuruServicesComponent', () => {
  let component: GuestPlatformServicesComponent;
  let fixture: ComponentFixture<GuestPlatformServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestPlatformServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPlatformServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
