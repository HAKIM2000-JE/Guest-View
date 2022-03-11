import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPropertyGuidesDesktopComponent } from './guest-property-guides-desktop.component';

describe('GuestPropertyGuidesDesktopComponent', () => {
  let component: GuestPropertyGuidesDesktopComponent;
  let fixture: ComponentFixture<GuestPropertyGuidesDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestPropertyGuidesDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPropertyGuidesDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
