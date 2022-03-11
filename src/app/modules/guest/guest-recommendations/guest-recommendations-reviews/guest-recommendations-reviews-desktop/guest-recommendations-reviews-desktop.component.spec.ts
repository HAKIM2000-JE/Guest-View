import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRecommendationsReviewsDesktopComponent } from './guest-recommendations-reviews-desktop.component';

describe('GuestRecommendationsReviewsDesktopComponent', () => {
  let component: GuestRecommendationsReviewsDesktopComponent;
  let fixture: ComponentFixture<GuestRecommendationsReviewsDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestRecommendationsReviewsDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRecommendationsReviewsDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
