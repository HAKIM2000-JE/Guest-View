import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestMenuDesktopComponent } from './guest-menu-desktop.component';

describe('GuestMenuDesktopComponent', () => {
  let component: GuestMenuDesktopComponent;
  let fixture: ComponentFixture<GuestMenuDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestMenuDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestMenuDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
