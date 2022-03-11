import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRecommendationsReviewsComponent } from './guest-recommendations-reviews.component';

describe('GuestRecommendationsReviewsComponent', () => {
  let component: GuestRecommendationsReviewsComponent;
  let fixture: ComponentFixture<GuestRecommendationsReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestRecommendationsReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRecommendationsReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
