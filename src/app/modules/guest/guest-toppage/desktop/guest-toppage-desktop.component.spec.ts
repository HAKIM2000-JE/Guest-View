import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestToppageDesktopComponent } from './guest-toppage-desktop.component';

describe('GuestToppageDesktopComponent', () => {
  let component: GuestToppageDesktopComponent;
  let fixture: ComponentFixture<GuestToppageDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestToppageDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestToppageDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
