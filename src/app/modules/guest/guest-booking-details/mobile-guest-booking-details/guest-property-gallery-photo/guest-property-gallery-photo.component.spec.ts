import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPropertyGalleryPhotoComponent } from './guest-property-gallery-photo.component';

describe('GuestPropertyGalleryPhotoComponent', () => {
  let component: GuestPropertyGalleryPhotoComponent;
  let fixture: ComponentFixture<GuestPropertyGalleryPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestPropertyGalleryPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPropertyGalleryPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
