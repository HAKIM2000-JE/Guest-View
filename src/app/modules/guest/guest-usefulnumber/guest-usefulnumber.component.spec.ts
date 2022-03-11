import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestUsefulnumberComponent } from './guest-usefulnumber.component';

describe('GuestUsefulnumberComponent', () => {
  let component: GuestUsefulnumberComponent;
  let fixture: ComponentFixture<GuestUsefulnumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestUsefulnumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestUsefulnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
