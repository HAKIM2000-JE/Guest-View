import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRecommendationsReviewsMobileComponent } from './guest-recommendations-reviews-mobile.component';

describe('GuestRecommendationsReviewsMobileComponent', () => {
  let component: GuestRecommendationsReviewsMobileComponent;
  let fixture: ComponentFixture<GuestRecommendationsReviewsMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestRecommendationsReviewsMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRecommendationsReviewsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
