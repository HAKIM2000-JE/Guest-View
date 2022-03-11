import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBookletReviewsComponent } from './footer-booklet-reviews.component';

describe('FooterBookletReviewsComponent', () => {
  let component: FooterBookletReviewsComponent;
  let fixture: ComponentFixture<FooterBookletReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterBookletReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterBookletReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
