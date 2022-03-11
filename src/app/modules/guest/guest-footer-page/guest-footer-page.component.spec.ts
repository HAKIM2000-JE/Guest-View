import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestFooterPageComponent } from './guest-footer-page.component';

describe('GuestFooterPageComponent', () => {
  let component: GuestFooterPageComponent;
  let fixture: ComponentFixture<GuestFooterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestFooterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestFooterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
