import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestHygieneComponent } from './guest-hygiene.component';

describe('GuestHygieneComponent', () => {
  let component: GuestHygieneComponent;
  let fixture: ComponentFixture<GuestHygieneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestHygieneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestHygieneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
