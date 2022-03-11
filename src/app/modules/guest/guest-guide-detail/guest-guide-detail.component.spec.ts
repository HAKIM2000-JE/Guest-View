import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestGuideDetailComponent } from './guest-guide-detail.component';

describe('GuestGuideDetailComponent', () => {
  let component: GuestGuideDetailComponent;
  let fixture: ComponentFixture<GuestGuideDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestGuideDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestGuideDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
