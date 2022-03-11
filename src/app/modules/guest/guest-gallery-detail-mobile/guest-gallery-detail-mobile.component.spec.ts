import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestGalleryDetailMobileComponent } from './guest-gallery-detail-mobile.component';

describe('GuestGalleryDetailMobileComponent', () => {
  let component: GuestGalleryDetailMobileComponent;
  let fixture: ComponentFixture<GuestGalleryDetailMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestGalleryDetailMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestGalleryDetailMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
