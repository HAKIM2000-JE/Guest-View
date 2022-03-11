import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRecommendationsCardComponent } from './guest-recommendations-card.component';

describe('GuestRecommendationsCardComponent', () => {
  let component: GuestRecommendationsCardComponent;
  let fixture: ComponentFixture<GuestRecommendationsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestRecommendationsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRecommendationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
