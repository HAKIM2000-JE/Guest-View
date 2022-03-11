import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRecommendationsViewDesktopComponent } from './guest-recommendations-view-desktop.component';

describe('GuestRecommendationsViewDesktopComponent', () => {
  let component: GuestRecommendationsViewDesktopComponent;
  let fixture: ComponentFixture<GuestRecommendationsViewDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestRecommendationsViewDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRecommendationsViewDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
