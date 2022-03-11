import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopGuestUsefulnumberComponent } from './desktop-guest-usefulnumber.component';

describe('DesktopGuestUsefulnumberComponent', () => {
  let component: DesktopGuestUsefulnumberComponent;
  let fixture: ComponentFixture<DesktopGuestUsefulnumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopGuestUsefulnumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopGuestUsefulnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
