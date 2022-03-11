import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestGuidePhotoDetailComponent } from './guest-guide-photo-detail.component';

describe('GuestGuidePhotoDetailComponent', () => {
  let component: GuestGuidePhotoDetailComponent;
  let fixture: ComponentFixture<GuestGuidePhotoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestGuidePhotoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestGuidePhotoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
