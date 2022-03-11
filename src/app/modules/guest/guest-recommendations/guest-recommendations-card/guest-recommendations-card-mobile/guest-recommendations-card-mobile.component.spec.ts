import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRecommendationsCardMobileComponent } from './guest-recommendations-card-mobile.component';

describe('GuestRecommendationsCardMobileComponent', () => {
  let component: GuestRecommendationsCardMobileComponent;
  let fixture: ComponentFixture<GuestRecommendationsCardMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestRecommendationsCardMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRecommendationsCardMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
