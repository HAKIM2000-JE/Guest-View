import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPropertyGalleryComponent } from './guest-property-gallery.component';

describe('GuestPropertyGalleryComponent', () => {
  let component: GuestPropertyGalleryComponent;
  let fixture: ComponentFixture<GuestPropertyGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestPropertyGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPropertyGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
