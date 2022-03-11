import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestHygieneDesktopComponent } from './guest-hygiene-desktop.component';

describe('GuestHygieneDesktopComponent', () => {
  let component: GuestHygieneDesktopComponent;
  let fixture: ComponentFixture<GuestHygieneDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestHygieneDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestHygieneDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
