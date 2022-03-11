import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRecommendationsCardDesktopComponent } from './guest-recommendations-card-desktop.component';

describe('GuestRecommendationsCardDesktopComponent', () => {
  let component: GuestRecommendationsCardDesktopComponent;
  let fixture: ComponentFixture<GuestRecommendationsCardDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestRecommendationsCardDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRecommendationsCardDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
