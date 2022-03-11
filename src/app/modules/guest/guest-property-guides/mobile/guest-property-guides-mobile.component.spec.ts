import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPropertyGuidesMobileComponent } from './guest-property-guides-mobile.component';

describe('GuestPropertyGuidesMobileComponent', () => {
  let component: GuestPropertyGuidesMobileComponent;
  let fixture: ComponentFixture<GuestPropertyGuidesMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestPropertyGuidesMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPropertyGuidesMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
