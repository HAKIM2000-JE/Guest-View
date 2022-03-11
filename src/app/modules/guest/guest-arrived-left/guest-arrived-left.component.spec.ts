import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestArrivedLeftComponent } from './guest-arrived-left.component';

describe('GuestArrivedLeftComponent', () => {
  let component: GuestArrivedLeftComponent;
  let fixture: ComponentFixture<GuestArrivedLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestArrivedLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestArrivedLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
