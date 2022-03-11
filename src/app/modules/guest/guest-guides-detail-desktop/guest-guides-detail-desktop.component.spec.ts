import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestGuidesDetailDesktopComponent } from './guest-guides-detail-desktop.component';

describe('GuestGuidesDetailDesktopComponent', () => {
  let component: GuestGuidesDetailDesktopComponent;
  let fixture: ComponentFixture<GuestGuidesDetailDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestGuidesDetailDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestGuidesDetailDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
