import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRecommendationsMapMobileComponent } from './guest-recommendations-map-mobile.component';

describe('GuestRecommendationsMapMobileComponent', () => {
  let component: GuestRecommendationsMapMobileComponent;
  let fixture: ComponentFixture<GuestRecommendationsMapMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestRecommendationsMapMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRecommendationsMapMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
