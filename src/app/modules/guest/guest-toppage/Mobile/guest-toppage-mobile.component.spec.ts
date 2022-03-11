import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestToppageMobileComponent } from './guest-toppage-mobile.component';

describe('GuestToppageMobileComponent', () => {
  let component: GuestToppageMobileComponent;
  let fixture: ComponentFixture<GuestToppageMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestToppageMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestToppageMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
