import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestLandingPageComponent } from './guest-landing-page.component';

describe('GuestLandingPageComponent', () => {
  let component: GuestLandingPageComponent;
  let fixture: ComponentFixture<GuestLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
