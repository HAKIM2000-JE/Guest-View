import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestMenuMobileComponent } from './guest-menu-mobile.component';

describe('GuestMenuDesktopComponent', () => {
  let component: GuestMenuMobileComponent;
  let fixture: ComponentFixture<GuestMenuMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestMenuMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestMenuMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
