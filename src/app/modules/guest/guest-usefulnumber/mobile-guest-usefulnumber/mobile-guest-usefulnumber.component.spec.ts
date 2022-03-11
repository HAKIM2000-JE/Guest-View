import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileGuestUsefulnumberComponent } from './mobile-guest-usefulnumber.component';

describe('MobileGuestUsefulnumberComponent', () => {
  let component: MobileGuestUsefulnumberComponent;
  let fixture: ComponentFixture<MobileGuestUsefulnumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileGuestUsefulnumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileGuestUsefulnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
