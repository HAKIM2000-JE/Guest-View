import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestReviewTeamamteComponent } from './guest-review-teamamte.component';

describe('GuestReviewTeamamteComponent', () => {
  let component: GuestReviewTeamamteComponent;
  let fixture: ComponentFixture<GuestReviewTeamamteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestReviewTeamamteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestReviewTeamamteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
