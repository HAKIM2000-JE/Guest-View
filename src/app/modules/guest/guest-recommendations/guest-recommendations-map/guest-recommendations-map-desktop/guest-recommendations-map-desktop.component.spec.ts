import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRecommendationsMapDesktopComponent } from './guest-recommendations-map-desktop.component';

describe('GuestRecommendationsMapDesktopComponent', () => {
  let component: GuestRecommendationsMapDesktopComponent;
  let fixture: ComponentFixture<GuestRecommendationsMapDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestRecommendationsMapDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestRecommendationsMapDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
