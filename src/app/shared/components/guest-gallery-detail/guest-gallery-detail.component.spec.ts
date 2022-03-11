import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestGalleryDetailComponent } from './guest-gallery-detail.component';

describe('GuestGalleryDetailComponent', () => {
  let component: GuestGalleryDetailComponent;
  let fixture: ComponentFixture<GuestGalleryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestGalleryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestGalleryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
