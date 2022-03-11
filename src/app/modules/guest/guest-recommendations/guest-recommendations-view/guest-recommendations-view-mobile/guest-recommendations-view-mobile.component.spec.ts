import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRecommendationsViewMobileComponent } from './guest-recommendations-view-mobile.component';

describe('GuestRecommendationsViewMobileComponent', () => {
  let component: GuestRecommendationsViewMobileComponent;
  let fixture: ComponentFixture<GuestRecommendationsViewMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestRecommendationsViewMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRecommendationsViewMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
