import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRecommendationsMapComponent } from './guest-recommendations-map.component';

describe('GuestRecommendationsMapComponent', () => {
  let component: GuestRecommendationsMapComponent;
  let fixture: ComponentFixture<GuestRecommendationsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestRecommendationsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRecommendationsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
