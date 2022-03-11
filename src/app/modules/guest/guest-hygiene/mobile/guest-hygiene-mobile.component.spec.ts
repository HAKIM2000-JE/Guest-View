import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestHygieneMobileComponent } from './guest-hygiene-mobile.component';

describe('GuestHygieneMobileComponent', () => {
  let component: GuestHygieneMobileComponent;
  let fixture: ComponentFixture<GuestHygieneMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestHygieneMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestHygieneMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
