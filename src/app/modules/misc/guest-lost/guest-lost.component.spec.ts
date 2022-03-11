import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestLostComponent } from './guest-lost.component';

describe('GuestLostComponent', () => {
  let component: GuestLostComponent;
  let fixture: ComponentFixture<GuestLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
