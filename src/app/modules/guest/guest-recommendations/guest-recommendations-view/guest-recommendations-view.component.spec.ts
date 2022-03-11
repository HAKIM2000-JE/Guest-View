import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRecommendationsViewComponent } from './guest-recommendations-view.component';

describe('GuestRecommendationsViewComponent', () => {
  let component: GuestRecommendationsViewComponent;
  let fixture: ComponentFixture<GuestRecommendationsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestRecommendationsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRecommendationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
